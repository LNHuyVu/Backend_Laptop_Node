import productService from "../services/productService";
let handleGetAllProduct=async(req, res)=>{
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
}
let handleCreateNewProduct=async(req, res)=>
{
  let message=await productService.createNewProduct(req.body);
  return res.status(200).json(message);
}
let handleDeleteProduct=async(req, res)=>{
  if(!req.body.id)
  {
    return res.status(200).json({
      errCode:1,
      message:"Missing ID Product",
    })
  }
  let message=await productService.deleteProduct(req.body.id);
  return res.status(200).json(message);
}
let handleEditProduct=async(req, res)=>{
  let data=req.body;
  let message=await productService.editProduct(data);
  return res.status(200).json(message)
}
module.exports={
    handleGetAllProduct:handleGetAllProduct,
    handleCreateNewProduct:handleCreateNewProduct,
    handleDeleteProduct:handleDeleteProduct,
    handleEditProduct:handleEditProduct,
}