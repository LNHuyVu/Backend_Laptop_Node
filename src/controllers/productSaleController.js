import productSaleService from "../services/productSaleService";
let handleGetAllProductSale = async (req, res) => {
  let id = req.query.id; //ALL or ID
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Not Exit ID Product Sale",
      product: [],
    });
  }
  let productsale = await productSaleService.getAllProductSale(id);
  console.log(productsale);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    productsale,
  });
};
let handleCreateNewProductSale = async (req, res) => {
  let message = await productSaleService.createNewProductSale(req.body);
  return res.status(200).json(message);
};
let handleDeleteProductSale = async (req, res) => {
  console.log(req.body);
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing ID Product Sale",
    });
  }
  let message = await productSaleService.deleteProductSale(req.body.id);
  return res.status(200).json(message);
};
let handleEditProductSale = async (req, res) => {
  let data = req.body;
  let message = await productSaleService.editProductSale(data);
  return res.status(200).json(message);
};
module.exports = {
  handleGetAllProductSale: handleGetAllProductSale,
  handleCreateNewProductSale: handleCreateNewProductSale,
  handleDeleteProductSale: handleDeleteProductSale,
  handleEditProductSale: handleEditProductSale,
};
