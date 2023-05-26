import db from "../models/index";
let getAllMenu = async (menuId) => {
  try {
    let menu = "";
    if (menuId === "ALL") {
      menu = await db.Menus.findAll({
        order:[["id","DESC"]]
      });
    }
    if (menuId && menuId !== "ALL") {
      menu = await db.Menus.findOne({
        where: { id: menuId },
      });
    }
    return menu;
  } catch (e) {
    throw new Error(e);
  }
};
let createNewMenu = async (data) => {
  try {
    if (Array.isArray(data)) {
      await db.Menus.bulkCreate(data);
    } else {
      await db.Menus.create({
        name: data.name,
        menuId: data.menuId,
        link: data.link,
        createdBy: data.createdBy,
        parentId: data.parentId,
        status: data.status,
      });
    }
    return {
      errCode: 0,
      message: "Create menu OK",
    };
  } catch (e) {
    throw new Error(e);
  }
};
let editMenu = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: 1,
        message: "Missing request ID Menu",
      };
    }
    let menu = await db.Menus.findOne({
      where: { id: data.id },
    });
    if (menu) {
      (menu.name = data.name),
        (menu.menuId = data.menuId),
        (menu.createdBy = data.createdBy),
        (menu.link = data.link),
        (menu.parentId = data.parentId),
        (menu.status = data.status);
      await menu.save();
      return {
        errCode: 0,
        message: "Update Menu OK",
      };
    } else {
      return {
        errCode: 2,
        message: "Menu not found",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
let deleteMenu = async (menuId) => {
  let menu = await db.Menus.findOne({
    where: { id: menuId },
  });
  if (!menu) {
    return {
      errCode: 2,
      message: "Not Exit Menu",
    };
  }
  await db.Menus.destroy({
    where: { id: menuId },
  });
  return {
    errCode: 0,
    message: "Delete Menu OK",
  };
};
module.exports = {
  createNewMenu: createNewMenu,
  getAllMenu: getAllMenu,
  editMenu: editMenu,
  deleteMenu: deleteMenu,
};
