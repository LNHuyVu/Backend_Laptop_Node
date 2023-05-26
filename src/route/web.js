import express from "express";
import userController from "../controllers/userController";
import topicController from "../controllers/topicController";
import productController from "../controllers/productController";
import postController from "../controllers/postController";
import orderdetailController from "../controllers/orderdetailController";
import orderController from "../controllers/orderController";
import categoryController from "../controllers/categoryController";
import sliderController from "../controllers/sliderController";
import menuController from "../controllers/menuController";
import contactController from "../controllers/contactController";
import productValueController from "../controllers/productValueController";
import productOptionController from "../controllers/productOptionController";
import productStoreController from "../controllers/productStoreController";
import productImageController from "../controllers/productImageController";
import productSaleController from "../controllers/productSaleController";
import authController from "../controllers/authController";
import cartController from "../controllers/cartController";
import emailController from "../controllers/emailController";
import middlewareController from "../controllers/middlewareController";
let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.send("fff");
  });
  //Login AUTH
  router.post("/api/login", authController.handleLogin);
  router.post("/api/logout", authController.handleLogout);
  router.post("/api/register", authController.handleCreateNewUser);
  router.post("/api/refresh", authController.handleRefreshToken);
  //APIs USER
  router.get(
    "/api/get-all-user",
    middlewareController.verifyToken,
    userController.handleGetAllUser
  );
  router.post(
    "/api/create-new-user",
    middlewareController.verifyToken,
    userController.handleCreateNewUser
  );
  router.delete(
    "/api/delete-user",
    middlewareController.verifyTokenAndAdminAuth,
    userController.handleDeleteUser
  );
  router.put(
    "/api/edit-user",
    middlewareController.verifyToken,
    userController.handleEditUser
  );
  //ChangePassword
  router.post(
    "/api/change-password-user",
    middlewareController.verifyToken,
    userController.handleChangePassword
  );

  //APIs TOPIC
  router.get("/api/get-all-topic", topicController.handleGetAllTopic);
  router.post("/api/create-new-topic", topicController.handleCreateNewTopic);
  router.delete("/api/delete-topic", topicController.handleDeleteTopic);
  router.put("/api/edit-topic", topicController.handleEditTopic);

  //APIs PRODUCT
  router.get("/api/get-all-product", productController.handleGetAllProduct);
  router.get(
    "/api/customer/get-product",
    productController.handleGetIdProductCustomer
  );
  router.get(
    "/api/customer/get-cat-product",
    productController.handleGetCatProductCustomer
  );
  router.get(
    "/api/customer/search-product",
    productController.handleSearchProductCustomer
  );
  //
  router.post(
    "/api/create-new-product",
    productController.handleCreateNewProduct
  );
  router.delete("/api/delete-product", productController.handleDeleteProduct);
  router.put("/api/edit-product", productController.handleEditProduct);

  //APIs PRODUCT_VALUE
  router.get(
    "/api/get-all-productvalue",
    productValueController.handleGetAllProductValue
  );
  router.post(
    "/api/create-new-productvalue",
    middlewareController.verifyToken,
    productValueController.handleCreateNewProductValue
  );
  router.delete(
    "/api/delete-productvalue",
    middlewareController.verifyToken,
    productValueController.handleDeleteProductValue
  );
  router.put(
    "/api/edit-productvalue",
    middlewareController.verifyToken,
    productValueController.handleEditProductValue
  );
  //ProductValue CUS
  //Get Cus
  router.get(
    "/api/customer/get-all-productvalue/",
    productValueController.handleGetAllProductValueCustomer
  );
  router.get(
    "/api/customer/get-demand-productvalue/",
    productValueController.handleGetDemandProductValueCustomer
  );

  //APIs PRODUCT_OPTION
  router.get(
    "/api/get-all-productoption",
    productOptionController.handleGetAllProductOption
  );
  router.post(
    "/api/create-new-productoption",
    productOptionController.handleCreateNewProductOption
  );
  router.delete(
    "/api/delete-productoption",
    productOptionController.handleDeleteProductOption
  );
  router.put(
    "/api/edit-productoption",
    productOptionController.handleEditProductOption
  );

  //APIs PRODUCT_STORE
  router.get(
    "/api/get-all-productstore",
    productStoreController.handleGetAllProductStore
  );
  router.post(
    "/api/create-new-productstore",
    productStoreController.handleCreateNewProductStore
  );
  router.delete(
    "/api/delete-productstore",
    productStoreController.handleDeleteProductStore
  );
  router.put(
    "/api/edit-productstore",
    productStoreController.handleEditProductStore
  );
  //Handle Quantity Order Product Store
  router.put(
    "/api/quantity-productstore",
    productStoreController.handleQuantityProductStore
  );

  //APIs PRODUCT_IMAGE
  router.get(
    "/api/get-all-productimage",
    productImageController.handleGetAllProductImage
  );
  router.post(
    "/api/create-new-productimage",
    productImageController.handleCreateNewProductImage
  );
  router.delete(
    "/api/delete-productimage",
    productImageController.handleDeleteProductImage
  );
  router.put(
    "/api/edit-productimage",
    productImageController.handleEditProductImage
  );

  //APIs PRODUCT_SALE
  router.get(
    "/api/get-all-productsale",
    productSaleController.handleGetAllProductSale
  );
  router.post(
    "/api/create-new-productsale",
    productSaleController.handleCreateNewProductSale
  );
  router.delete(
    "/api/delete-productsale",
    productSaleController.handleDeleteProductSale
  );
  router.put(
    "/api/edit-productsale",
    productSaleController.handleEditProductSale
  );

  //APIs POST
  router.get("/api/get-all-post", postController.handleGetAllPost);
  router.get("/api/customer/get-all-post", postController.handleGetTopIdPost);

  // End get Cus
  router.post("/api/create-new-post", postController.handleCreateNewPost);
  router.delete("/api/delete-post", postController.handleDeletePost);
  router.put("/api/edit-post", postController.handleEditPost);

  //APIs OrderDetail
  router.get(
    "/api/get-all-orderdetail",
    orderdetailController.handleGetAllOrderDetail
  );
  // Get Product Hot
  router.get(
    "/api/get-all-producthot",
    orderdetailController.handleGetAllProductHot
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
  //Get Cus
  router.get(
    "/api/customer/get-id-category",
    categoryController.handleGetIdCategoryCustomer
  );
  router.get(
    "/api/customer/get-all-category",
    categoryController.handleGetAllCategoryCustomer
  );
  //End get Cus
  router.post(
    "/api/create-new-category",
    middlewareController.verifyToken,
    categoryController.handleCreateNewCategory
  );
  router.delete(
    "/api/delete-category",
    middlewareController.verifyToken,
    categoryController.handleDeleteCategory
  );
  router.put("/api/edit-category", categoryController.handleEditCategory);

  //APIs SLIDER
  router.get("/api/get-all-slider", sliderController.handleGetAllSlider);
  router.post("/api/create-new-slider", sliderController.handleCreateNewSlider);
  router.delete("/api/delete-slider", sliderController.handleDeleteSlider);
  router.put("/api/edit-slider", sliderController.handleEditSlider);

  // APIs MENU
  router.get("/api/get-all-menu", menuController.handleGetAllMenu);
  router.post("/api/create-new-menu", menuController.handleCreateNewMenu);
  router.put("/api/edit-menu", menuController.handleEditMenu);
  router.delete("/api/delete-menu", menuController.handleDeleteMenu);

  // APIs CONTACTS
  router.get("/api/get-all-contact", contactController.handleGetAllContact);
  router.post(
    "/api/create-new-contact",
    contactController.handleCreateNewContact
  );
  router.put("/api/edit-contact", contactController.handleEditContact);
  router.delete("/api/delete-contact", contactController.handleDeleteContact);

  // APIs CART
  router.get("/api/get-all-cart", cartController.handleGetAllCart);
  router.post("/api/add-cart", cartController.handleAddCart);
  router.put(
    "/api/increment-quantity-cart",
    cartController.handleIncrementCart
  );
  router.put(
    "/api/decrement-quantity-cart",
    cartController.handleDecrementCart
  );
  router.delete("/api/delete-item-cart", cartController.handleDeleteItemCart);
  //SEND EMAIL
  router.post("/api/send-email", emailController.handleSendEmail);
  router.post(
    "/api/send-email-contact",
    emailController.handleSendEmailContact
  );

  return app.use("/", router);
};
module.exports = initWebRoutes;
