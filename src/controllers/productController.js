import productService from "../services/productService";
let handleGetAllProduct = async (req, res) => {
  let id = req.query.id; //ALL or ID
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Not Exit ID Product",
      product: [],
    });
  }
  let product = await productService.getAllProducts(id);
  console.log(product);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    product,
  });
};
let handleCreateNewProduct = async (req, res) => {
  let message = await productService.createNewProduct(req.body);

  if (message.errCode == 0) {
    return res.status(200).json(message);
  } else {
    return res.status(500).json(message);
  }
};
let handleDeleteProduct = async (req, res) => {
  console.log(req.body);
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing ID Product",
    });
  }
  let message = await productService.deleteProduct(req.body.id);
  return res.status(200).json(message);
};
let handleEditProduct = async (req, res) => {
  let data = req.body;
  let message = await productService.editProduct(data);
  return res.status(200).json(message);
};
//Cus
let handleGetIdProductCustomer = async (req, res) => {
  let slug = req.query.slug; //ALL or ID
  if (!slug) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Not Exit ID Product",
      product: [],
    });
  }
  let product = await productService.getIdProductCustomer(slug);
  console.log(product);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    product,
  });
};
let handleGetCatProductCustomer = async (req, res) => {
  let catId = req.query.catId; //ALL or ID
  if (!catId) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Not Exit ID Product",
      product: [],
    });
  }
  let product = await productService.getCatProductCustomer(catId);
  console.log(product);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    product,
  });
};
let handleSearchProductCustomer = async (req, res) => {
  let slug = req.query.slug; //ALL or ID
  if (!slug) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Not Exit ID Product",
      product: [],
    });
  }
  let product = await productService.searchProductCustomer(slug);
  console.log(product);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    product,
  });
};
module.exports = {
  handleGetAllProduct: handleGetAllProduct,
  handleCreateNewProduct: handleCreateNewProduct,
  handleDeleteProduct: handleDeleteProduct,
  handleEditProduct: handleEditProduct,
  //Cus
  handleGetIdProductCustomer:handleGetIdProductCustomer,
  handleGetCatProductCustomer:handleGetCatProductCustomer,
  handleSearchProductCustomer:handleSearchProductCustomer
};
