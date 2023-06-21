import db from "../models/index";
import bcrypt from "bcryptjs";
import { Promise } from "sequelize";
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");

let refreshTokenArray = [];

let hashUserPassword = (password) => {
  try {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
  } catch (e) {
    throw new Error(e);
  }
};
let generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      roles: user.roles,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "1d" }
  );
};
let generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      roles: user.roles,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "365d" }
  );
};
// NEW TOKEN//////////////////////////////////////////////////////////
let GenerateNewToken = (refreshToken) => {
  const dataToken = {};
  if (!refreshTokenArray.includes(refreshToken)) {
    return (dataToken.data = "RefreshToken is not valid");
  }
  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
    if (err) {
      console.log(err);
    }
    refreshTokenArray = refreshTokenArray.filter(
      (token) => token != refreshToken
    );

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokenArray.push(newRefreshToken);

    dataToken.data = newAccessToken;
    dataToken.refreshToken = newRefreshToken;
  });
  return dataToken;
};
//
let handleUserLogin = async (email, password) => {
  // return new Promise(async (resolve, rejeck) => {
  try {
    let userData = {};
    let isExist = await checkUserEmail(email);
    if (isExist) {
      let user = await db.User.findOne({
        attributes: [
          "id",
          "name",
          "email",
          "roles",
          "password",
          "phone",
          "address",
          "img",
        ],
        where: { email: email, status: 1 },
        raw: true,
      });
      if (user) {
        let check = await bcrypt.compareSync(password, user.password);
        if (check) {
          // JWT ACCESS TOKEN
          const accessToken = generateAccessToken(user);
          // JWT REFRESH TOKEN
          const refreshToken = generateRefreshToken(user);
          //Push
          refreshTokenArray.push(refreshToken);
          //
          userData.errCode = 0;
          userData.errMessage = "OK";
          userData.accessToken = accessToken;
          userData.refreshToken = refreshToken;
          delete user.password;
          userData.user = user;
          return userData;
        } else {
          userData.errCode = 3;
          userData.errMessage = "Mật khẩu không chính xác";
          return userData;
        }
      } else {
        userData.errCode = 2;
        userData.errMessage = "Tài khoản bị vô hiệu hóa";
        return userData;
      }
    } else {
      userData.errCode = 1;
      userData.errMessage = "Email không tồn tại!";
      return userData;
    }
  } catch (e) {
    throw new Error(e);
  }
  // });
};
//Logout
let logout = (req, res) => {
  res.clearCookie("refreshToken");
  refreshTokenArray = refreshTokenArray.filter(
    (token) => token !== req.cookies.refreshToken
  );
  return "Logout Ok";
};
let checkUserEmail = async (userEmail) => {
  try {
    let user = await db.User.findOne({
      where: { email: userEmail },
    });
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    throw new Error(e);
  }
};
let getAllUsers = async (userId) => {
  try {
    let users = "";
    if (userId === "ALL") {
      users = await db.User.findAll({
        attributes: {
          exclude: ["password"],
        },
      });
    }
    if (userId && userId !== "ALL") {
      users = await db.User.findOne({
        where: { id: userId },
        attributes: {
          exclude: ["password"],
        },
      });
    }
    return users;
  } catch (e) {
    throw new Error(e);
  }
};

let createNewUser = async (data) => {
  try {
    let check = await checkUserEmail(data.email);
    if (check === true) {
      return {
        errCode: 1,
        message: "Email đã tồn tại!",
      };
    } else {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        name: data.name,
        email: data.email,
        password: hashPasswordFromBcrypt,
        img: data.img,
        gender: data.gender === "1" ? true : false,
        phone: data.phone,
        address: data.address,
        roles: data.roles,
        createdBy: data.createdBy,
        status: data.status,
      });
      return {
        errCode: 0,
        message: "Create User OK",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
let deleteUser = async (userid) => {
  let user = await db.User.findOne({
    where: { id: userid },
  });
  if (!user) {
    return {
      errCode: 2,
      message: "Not Exit User",
    };
  }
  await db.User.destroy({
    where: { id: userid },
  });
  return {
    errCode: 0,
    message: "Delete OK",
  };
};
let editUser = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: 1,
        message: "Missing request ID",
      };
    }
    let user = await db.User.findOne({
      where: { id: data.id },
    });
    if (user) {
      (user.name = data.name),
        (user.img = data.img),
        (user.phone = data.phone),
        (user.gender = data.gender),
        (user.roles = data.roles),
        (user.address = data.address);
      user.status = data.status;
      await user.save();
      return {
        errCode: 0,
        message: "Update user OK",
      };
    } else {
      return {
        errCode: 2,
        message: "User not found",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  editUser: editUser,
  GenerateNewToken: GenerateNewToken,
  logout: logout,
};
