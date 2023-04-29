import productStoreService from "../services/productStoreService"
let handleGetAllProductStore = async (req, res) => {
  let id = req.query.id; //ALL or ID
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Not Exit ID Product Store",
      product: [],
    });
  }
  let productstore = await productStoreService.getAllProductStore(id);
  console.log(productstore);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    productstore,
  });
};
let handleCreateNewProductStore = async (req, res) => {
  let message = await productStoreService.createNewProductStore(req.body);
  return res.status(200).json(message);
};
let handleDeleteProductStore = async (req, res) => {
  console.log(req.body);
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing ID Product Store",
    });
  }
  let message = await productStoreService.deleteProductStore(req.body.id);
  return res.status(200).json(message);
};
let handleEditProductStore = async (req, res) => {
  let data = req.body;
  let message = await productStoreService.editProductStore(data);
  return res.status(200).json(message);
};
let handleQuantityProductStore = async (req, res) => {
  let data = req.body;
  let message = await productStoreService.quantityProductStore(data);
  return res.status(200).json(message);
};
module.exports = {
  handleGetAllProductStore: handleGetAllProductStore,
  handleCreateNewProductStore: handleCreateNewProductStore,
  handleDeleteProductStore: handleDeleteProductStore,
  handleEditProductStore: handleEditProductStore,
  //
  handleQuantityProductStore:handleQuantityProductStore
};
