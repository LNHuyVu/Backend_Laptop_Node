import orderdetailService from "../services/orderdetailService";
let handleGetAllOrderDetail = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing Request ID OrderDetail",
      orderdetail: [],
    });
  }
  let orderdetail = await orderdetailService.getAllOrderDetail(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    orderdetail,
  });
};
let handleCreateNewOrderDetail = async (req, res) => {
  let message = await orderdetailService.createNewOrderDetail(req.body);
  return res.status(200).json(message);
};
let handleDeleteOrderDetail = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing ID OrderDetail",
    });
  }
  let message = await orderdetailService.deleteOrderDetail(req.body.id);
  return res.status(200).json(message);
};
let handleEditOrderDetail=async(req, res)=>{
    let data = req.body;
    let message = await orderdetailService.editOrderDetail(data);
    return res.status(200).json(message);
}
let handleGetAllProductHot = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing Request ID OrderDetail",
      orderdetail: [],
    });
  }
  let productHot = await orderdetailService.getAllProducthot(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    productHot,
  });
};
module.exports = {
  handleGetAllOrderDetail: handleGetAllOrderDetail,
  handleCreateNewOrderDetail: handleCreateNewOrderDetail,
  handleDeleteOrderDetail: handleDeleteOrderDetail,
  handleEditOrderDetail:handleEditOrderDetail,
  //product hot
  handleGetAllProductHot:handleGetAllProductHot
};
