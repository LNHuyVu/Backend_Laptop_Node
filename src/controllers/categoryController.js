import categoryService from "../services/categoryService";
let handleGetAllCategory = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing request ID category",
      category: [],
    });
  }
  let category = await categoryService.getAllCategory(id);
  return res.status(200).json({
    errCode: 0,
    message: "OK",
    category,
  });
};
let handleCreateNewCategory = async (req, res) => {
  let message = await categoryService.createNewCategory(req.body);
  if (message.errCode == 0) {
    return res.status(200).json(message);
  } else {
    return res.status(500).json(message);
  }
};
let handleDeleteCategory = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing ID Category",
    });
  }
  let message = await categoryService.deleteCategory(req.body.id);
  return res.status(200).json(message);
};
let handleEditCategory = async (req, res) => {
  let data = req.body;
  // console.log(data);
  let message = await categoryService.editCategory(data);
  return res.status(200).json(message);
};

/// Get cus "ID" Cat
let handleGetIdCategoryCustomer = async (req, res) => {
  let slug = req.query.slug;
  if (!slug) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing request ID category",
      product: [],
    });
  }
  let category = await categoryService.getIdCategoryCustomer(slug);
  return res.status(200).json({
    errCode: 0,
    message: "OK",
    category,
  });
};
let handleGetAllCategoryCustomer = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing request ID category",
      category: [],
    });
  }
  let category = await categoryService.getAllCategory(id);
  return res.status(200).json({
    errCode: 0,
    message: "OK",
    category,
  });
};
module.exports = {
  handleGetAllCategory: handleGetAllCategory,
  handleCreateNewCategory: handleCreateNewCategory,
  handleDeleteCategory: handleDeleteCategory,
  handleEditCategory: handleEditCategory,
  //Get cus
  handleGetIdCategoryCustomer: handleGetIdCategoryCustomer,
  handleGetAllCategoryCustomer: handleGetAllCategoryCustomer,
};
