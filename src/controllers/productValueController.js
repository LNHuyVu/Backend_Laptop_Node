import productValueService from "../services/productValueService";
let handleGetAllProductValue = async (req, res) => {
  let id = req.query.id; //ALL or ID
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Not Exit ID Product",
      product: [],
    });
  }
  let productvalue = await productValueService.getAllProductValue(id);
  console.log(productvalue);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    productvalue,
  });
};
let handleCreateNewProductValue = async (req, res) => {
  let message = await productValueService.createNewProductValue(req.body);
  if (message.errCode == 1) {
    return res.status(500).json(message);
  } else {
    return res.status(200).json(message);
  }
};
let handleDeleteProductValue = async (req, res) => {
  console.log(req.body);
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing ID Product Value",
    });
  }
  let message = await productValueService.deleteProductValue(req.body.id);
  return res.status(200).json(message);
};
let handleEditProductValue = async (req, res) => {
  let data = req.body;
  let message = await productValueService.editProductValue(data);
  return res.status(200).json(message);
};
module.exports = {
  handleGetAllProductValue: handleGetAllProductValue,
  handleCreateNewProductValue: handleCreateNewProductValue,
  handleDeleteProductValue: handleDeleteProductValue,
  handleEditProductValue: handleEditProductValue,
};
