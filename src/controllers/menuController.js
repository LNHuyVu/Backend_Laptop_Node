import menuService from "../services/menuService";
let handleCreateNewMenu = async (req, res) => {
  let message = await menuService.createNewMenu(req.body);
  return res.status(200).json(message);
};
let handleGetAllMenu = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing request ID menu",
      category: [],
    });
  }
  let menu = await menuService.getAllMenu(id);
  return res.status(200).json({
    errCode: 0,
    message: "OK",
    menu,
  });
};
let handleEditMenu = async (req, res) => {
  let data = req.body;
  let message = await menuService.editMenu(data);
  return res.status(200).json(message);
};
let handleDeleteMenu = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing ID Menu",
    });
  }
  let message = await menuService.deleteMenu(req.body.id);
  return res.status(200).json(message);
};
module.exports = {
  handleCreateNewMenu: handleCreateNewMenu,
  handleGetAllMenu: handleGetAllMenu,
  handleEditMenu: handleEditMenu,
  handleDeleteMenu: handleDeleteMenu,
};
