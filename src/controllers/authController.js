import authService from "../services/authService";
let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing Info",
    });
  }
  let userData = await authService.handleUserLogin(email, password);
  //Save RefreshToken in Cookie
  res.cookie("refreshToken", userData.refreshToken, {
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite: "strict",
  });
  if (userData.errCode == 0) {
    return res.status(200).json({
      errCode: userData.errCode,
      message: userData.errMessage,
      accessToken: userData.accessToken,
      user: userData.user ? userData.user : {},
    });
  } else {
    return res.status(200).json({
      errCode: userData.errCode,
      message: userData.errMessage,
      user: userData.user ? userData.user : {},
    });
  }
};
//
let handleRefreshToken = async (req, res) => {
  // const refToken=req.cookies.refreshToken;
  //   console.log(req.cookies);
  //   console.log(req.cookies.refreshToken);
  let refreshToken = req.cookies.refreshToken;
  //   console.log("-------------------------", refreshToken);
  if (!refreshToken) {
    return res.status(401).json("You're not authenticated");
  } else {
    let dataToken = await authService.GenerateNewToken(refreshToken);
    res.cookie("refreshToken", dataToken.refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    return res.status(200).json({
      accessToken: dataToken.data,
    });
  }
};
//HandleLogout
const handleLogout = (req, res) => {
  const logout = authService.logout(req, res);
  return res.status(200).json(logout);
};
//
let handleGetAllUser = async (req, res) => {
  let id = req.query.id; //ALL or ID
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Not Exit ID",
      users: [],
    });
  }
  let users = await authService.getAllUsers(id);
  console.log(users);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};
let handleCreateNewUser = async (req, res) => {
  let message = await authService.createNewUser(req.body);
  return res.status(200).json(message);
};
let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await authService.editUser(data);
  return res.status(200).json(message);
};
let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Not found ID",
    });
  }
  let message = await authService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUser: handleGetAllUser,
  handleCreateNewUser: handleCreateNewUser,
  handleDeleteUser: handleDeleteUser,
  handleEditUser: handleEditUser,
  handleRefreshToken: handleRefreshToken,
  handleLogout: handleLogout,
};
