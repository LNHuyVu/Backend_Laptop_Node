import orderService from "../services/orderService";
let handleGetAllOrder = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing request ID order",
      order: [],
    });
  }
  let order = await orderService.getAllOrder(id);
  return res.status(200).json({
    errCode: 0,
    message: "OK",
    order,
  });
};
let handleCreateNewOrder = async (req, res) => {
  let message = await orderService.createNewOrder(req.body);
  return res.status(200).json(message);
};
let handleDeleteOrder=async(req, res)=>{
    if (!req.body.id) {
        return res.status(200).json({
          errCode: 1,
          message: "Missing ID Order",
        });
      }
      let message = await orderService.deleteOrder(req.body.id);
      return res.status(200).json(message);
}
let handleEditOrder =async(req, res)=>{
    let data = req.body;
    let message = await orderService.editOrder(data);
    return res.status(200).json(message);
}
module.exports = {
  handleGetAllOrder: handleGetAllOrder,
  handleCreateNewOrder: handleCreateNewOrder,
  handleDeleteOrder:handleDeleteOrder,
  handleEditOrder:handleEditOrder,
};
