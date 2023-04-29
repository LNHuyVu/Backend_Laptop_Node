import menuService from "../services/menuService";
import cartService from "../services/cartService";
let handleAddCart = async (req, res) => {
  console.log("------------------", req);
  let message = await cartService.addCart(req.body);
  return res.status(200).json(message);
};
let handleGetAllCart = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing request UserId Cart",
      cart: [],
    });
  }
  let cart = await cartService.getAllCart(id);
  return res.status(200).json({
    errCode: 0,
    message: "OK",
    cart,
  });
};
let handleIncrementCart = async (req, res) => {
  let data = req.body;
  let message = await cartService.incrementQuantityCart(data);
  return res.status(200).json(message);
};
let handleDecrementCart = async (req, res) => {
  let data = req.body;
  let message = await cartService.decrementQuantityCart(data);
  return res.status(200).json(message);
};
let handleDeleteItemCart = async (req, res) => {
  let userId=req.body.userId;
  let productId=req.body.productId;
  if (!userId || !productId) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing ID Product Cart",
    });
  }
  let message = await cartService.deleteItemCart(userId, productId);
  return res.status(200).json(message);
};
module.exports = {
  handleAddCart: handleAddCart,
  handleGetAllCart: handleGetAllCart,
  handleIncrementCart: handleIncrementCart,
  handleDecrementCart:handleDecrementCart,
  handleDeleteItemCart: handleDeleteItemCart,
};
