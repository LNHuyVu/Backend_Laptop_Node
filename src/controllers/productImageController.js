import productImageService from "../services/productImageService";
let handleGetAllProductImage = async (req, res) => {
  let id = req.query.id; //ALL or ID
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Not Exit ID Product Image",
      product: [],
    });
  }
  let productimage = await productImageService.getAllProductImage(id);
  console.log(productimage);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    productimage,
  });
};
let handleCreateNewProductImage = async (req, res) => {
  let message = await productImageService.createNewProductImage(req.body);
  return res.status(200).json(message);
};
let handleDeleteProductImage = async (req, res) => {
  console.log(req.body);
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing ID Product Image",
    });
  }
  let message = await productImageService.deleteProductImage(req.body.id);
  return res.status(200).json(message);
};
let handleEditProductImage = async (req, res) => {
  let data = req.body;
  let message = await productImageService.editProductImage(data);
  return res.status(200).json(message);
};
module.exports = {
  handleGetAllProductImage: handleGetAllProductImage,
  handleCreateNewProductImage: handleCreateNewProductImage,
  handleDeleteProductImage: handleDeleteProductImage,
  handleEditProductImage: handleEditProductImage,
};
