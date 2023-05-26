import db from "../models/index";
import bcrypt from "bcryptjs";
import { Promise } from "sequelize";
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  try {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
  } catch (e) {
    throw new Error(e);
  }
};
let handleChangePassword = async (email, password) => {
  try {
    let userData = {};
    let isExist = await checkUserEmail(email);
    if (isExist) {
      let user = await db.User.findOne({
        attributes: ["email", "roles", "password"],
        where: { email: email },
        raw: true,
      });
      if (user) {
        let check = await bcrypt.compareSync(password, user.password);
        if (check) {
          userData.errCode = 0;
          userData.errMessage = "OK";
          delete user.password;
          userData.user = user;
          return userData;
        } else {
          userData.errCode = 3;
          userData.errMessage = "Sai mật khẩu";
          return userData;
        }
      } else {
        userData.errCode = 2;
        userData.errMessage = "Email Not Exist Lv2";
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
};
let handleUserLogin = async (email, password) => {
  // return new Promise(async (resolve, rejeck) => {
  try {
    let userData = {};
    let isExist = await checkUserEmail(email);
    if (isExist) {
      let user = await db.User.findOne({
        attributes: ["email", "roles", "password"],
        where: { email: email },
        raw: true,
      });
      if (user) {
        let check = await bcrypt.compareSync(password, user.password);
        if (check) {
          userData.errCode = 0;
          userData.errMessage = "OK";
          delete user.password;
          userData.user = user;
          return userData;
        } else {
          userData.errCode = 3;
          userData.errMessage = "Wrong Password";
          return userData;
        }
      } else {
        userData.errCode = 2;
        userData.errMessage = "Email Not Exist Lv2";
        return userData;
      }
    } else {
      userData.errCode = 1;
      userData.errMessage = "Email Not Exist!";
      return userData;
    }
  } catch (e) {
    throw new Error(e);
  }
  // });
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
        include: [
          {
            model: db.Orders,
            as: "cart",
          },
        ],
      });
    }
    if (userId && userId !== "ALL") {
      users = await db.User.findOne({
        where: { id: userId },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Orders,
            as: "cart",
            include: [
              {
                model: db.Orderdetails,
                as: "orderDetail",
                include: [
                  {
                    model: db.Products,
                    as: "product",
                    attributes: ["id", "nameProduct"],
                    include: [
                      {
                        model: db.ProductImages,
                        as: "imgData",
                        attributes: ["id", "link"],
                      },
                    ],
                  },
                ],
              },
              {
                model: db.User,
                as: "user",
                attributes: {
                  exclude: [
                    "password",
                    "createdAt",
                    "createdBy",
                    "updatedAt",
                    "status",
                    "img",
                  ],
                },
              },
            ],
          },
        ],
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
        message: "Your email is already in used",
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
      if (!data.password) {
        (user.name = data.name),
          (user.img = data.img),
          (user.phone = data.phone),
          (user.gender = data.gender),
          (user.roles = data.roles),
          (user.address = data.address),
          (user.status = data.status),
          await user.save();
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        (user.name = data.name),
          (user.img = data.img),
          (user.phone = data.phone),
          (user.gender = data.gender),
          (user.roles = data.roles),
          (user.address = data.address),
          (user.status = data.status),
          (user.password = hashPasswordFromBcrypt),
          await user.save();
      }

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
  //change password
  handleChangePassword: handleChangePassword,
};
