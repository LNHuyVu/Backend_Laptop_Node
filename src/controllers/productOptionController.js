import productOptionService from "../services/productOptionService";
let handleGetAllProductOption = async (req, res) => {
  let id = req.query.id; //ALL or ID
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Not Exit ID Product Option",
      productoption: [],
    });
  }
  let productoption = await productOptionService.getAllProductOption(id);
  console.log(productoption);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    productoption,
  });
};
let handleCreateNewProductOption = async (req, res) => {
  let message = await productOptionService.createNewProductOption(req.body);
  return res.status(200).json(message);
};
let handleDeleteProductOption = async (req, res) => {
  console.log(req.body);
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing ID Product Option",
    });
  }
  let message = await productOptionService.deleteProductOption(req.body.id);
  return res.status(200).json(message);
};
let handleEditProductOption = async (req, res) => {
  let data = req.body;
  let message = await productOptionService.editProductOption(data);
  return res.status(200).json(message);
};
module.exports = {
  handleGetAllProductOption: handleGetAllProductOption,
  handleCreateNewProductOption: handleCreateNewProductOption,
  handleDeleteProductOption: handleDeleteProductOption,
  handleEditProductOption: handleEditProductOption,
};
