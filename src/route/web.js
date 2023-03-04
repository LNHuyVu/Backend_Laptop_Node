import express from "express";
import userController from "../controllers/userController";
import topicController from "../controllers/topicController";
import productController from "../controllers/productController";
import postController from "../controllers/postController";
import orderdetailController from "../controllers/orderdetailController";
import orderController from "../controllers/orderController";
import categoryController from "../controllers/categoryController";
let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.send("fff");
  });
  //APIs USER
  router.post('/api/login',userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUser);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.put("/api/edit-user", userController.handleEditUser);

  //APIs TOPIC
  router.get("/api/get-all-topic", topicController.handleGetAllTopic);
  router.post("/api/create-new-topic", topicController.handleCreateNewTopic);
  router.delete("/api/delete-topic", topicController.handleDeleteTopic);
  router.put("/api/edit-topic", topicController.handleEditTopic);

  //APIs PRODUCT
  router.get("/api/get-all-product", productController.handleGetAllProduct);
  router.post(
    "/api/create-new-product",
    productController.handleCreateNewProduct
  );
  router.delete("/api/delete-product", productController.handleDeleteProduct);
  router.put("/api/edit-product", productController.handleEditProduct);

  //APIs POST
  router.get("/api/get-all-post", postController.handleGetAllPost);
  router.post("/api/create-new-post", postController.handleCreateNewPost);
  router.delete("/api/delete-post", postController.handleDeletePost);
  router.put("/api/edit-post", postController.handleEditPost);

  //APIs OrderDetail
  router.get(
    "/api/get-all-orderdetail",
    orderdetailController.handleGetAllOrderDetail
  );
  router.post(
    "/api/create-new-orderdetail",
    orderdetailController.handleCreateNewOrderDetail
  );
  router.delete(
    "/api/delete-orderdetail",
    orderdetailController.handleDeleteOrderDetail
  );
  router.put(
    "/api/edit-orderdetail",
    orderdetailController.handleEditOrderDetail
  );

  //APIs ORDER
  router.get("/api/get-all-order", orderController.handleGetAllOrder);
  router.post("/api/create-new-order", orderController.handleCreateNewOrder);
  router.delete("/api/delete-order", orderController.handleDeleteOrder);
  router.put("/api/edit-order", orderController.handleEditOrder);

  //APIs CATEGORY
  router.get("/api/get-all-category", categoryController.handleGetAllCategory);
  router.post("/api/create-new-category", categoryController.handleCreateNewCategory);
  router.delete("/api/delete-category", categoryController.handleDeleteCategory);
  router.put("/api/edit-category", categoryController.handleEditCategory);

  return app.use("/", router);
};
module.exports = initWebRoutes;
