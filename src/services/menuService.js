import db from "../models/index";
let checkMenuName = async (menuName) => {
  try {
    let menu = await db.Menus.findOne({
      where: { name: menuName },
    });
    if (menu) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    throw new Error(e);
  }
};
let getAllMenu = async (menuId) => {
  try {
    let menu = "";
    if (menuId === "ALL") {
      menu = await db.Menus.findAll({});
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
    let check = await checkMenuName(data.name);
    if (check === true) {
      return {
        errCode: 1,
        message: "Your name Menu is already in used",
      };
    } else {
      await db.Menus.create({
        name: data.name,
        slug: data.slug,
        img: data.img,
        link: data.link,
        parentid: data.parentid,
        status: data.status,
      });
      return {
        errCode: 0,
        message: "Create menu OK",
      };
    }
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
        (menu.slug = data.slug),
        (menu.img = data.img),
        (menu.link = data.link),
        (menu.parentid = data.parentid),
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
