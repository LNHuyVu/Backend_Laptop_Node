import db from "../models/index";

let checkCategoryName = async (categoryName) => {
  try {
    let category = await db.Categorys.findOne({
      where: { name: categoryName },
    });
    if (category) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    throw new Error(e);
  }
};
let getAllCategory = async (categoryId) => {
  try {
    let category = "";
    if (categoryId === "ALL") {
      category = await db.Categorys.findAll();
    }
    if (categoryId && categoryId !== "ALL") {
      category = await db.Categorys.findOne({
        where: { id: categoryId },
      });
    }
    return category;
  } catch (e) {
    throw new Error(e);
  }
};
let createNewCategory = async (data) => {
  try {
    let check = await checkCategoryName(data.name);
    if (check === true) {
      return {
        errCode: 1,
        message: "Your name category is already in used",
      };
    } else {
      await db.Categorys.create({
        name: data.name,
        slug: data.slug,
        image: data.image,
        parentId: data.parentId,
        createdBy: data.createdBy,
        status: data.status,
      });
      return {
        errCode: 0,
        message: "Create category OK",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
let deleteCategory = async (categoryId) => {
  let category = await db.Categorys.findOne({
    where: { id: categoryId },
  });
  if (!category) {
    return {
      errCode: 2,
      message: "Not Exit ID category",
    };
  }
  await db.Categorys.destroy({
    where: { id: categoryId },
  });
  return {
    errCode: 0,
    message: "Delete Category OK",
  };
};
let editCategory = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: 1,
        message: "Missing request ID Category",
      };
    }
    let category = await db.Categorys.findOne({
      where: { id: data.id },
    });
    if (category) {
      (category.name = data.name),
        (category.image = data.image),
        (category.slug = data.slug),
        (category.parentId = data.parentId),
        (category.createdBy = data.createdBy),
        (category.status = data.status);
      await category.save();
      return {
        errCode: 0,
        message: "Update Category OK",
      };
    } else {
      return {
        errCode: 2,
        message: "ID Category not found",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
//Get Cus
let getIdCategoryCustomer = async (slug) => {
  try {
    let category = "";
    if (slug) {
      category = await db.Categorys.findOne({
        where: { slug: slug },
      });
    }
    return category;
  } catch (e) {
    throw new Error(e);
  }
};
module.exports = {
  getAllCategory: getAllCategory,
  createNewCategory: createNewCategory,
  deleteCategory: deleteCategory,
  editCategory: editCategory,
  //Get Cus
  getIdCategoryCustomer:getIdCategoryCustomer,
};
