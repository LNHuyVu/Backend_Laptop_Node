import userService from "../services/userService";
let handleChangePassword = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(200).json({
      errCode: 1,
      message: "Nhập mật khẩu cũ",
    });
  }
  let userData = await userService.handleChangePassword(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};
let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "NONO",
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};
let handleGetAllUser = async (req, res) => {
  let id = req.query.id; //ALL or ID
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Not Exit ID",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  console.log(users);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};
let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};
let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.editUser(data);
  return res.status(200).json(message);
};
let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Not found ID",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUser: handleGetAllUser,
  handleCreateNewUser: handleCreateNewUser,
  handleDeleteUser: handleDeleteUser,
  handleEditUser: handleEditUser,
  //ChangePassword
  handleChangePassword: handleChangePassword,
};
