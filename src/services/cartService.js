import db from "../models/index";
let checkAddCart = async (data) => {
  try {
    let kq = [];
    let cart = await db.Carts.findOne({
      where: { userId: data.userId, productId: data.productId },
    });
    if (cart) {
      kq.value = true;
      kq.quantity = cart.quantity;
      return kq;
    } else {
      kq.value = false;
      return kq;
    }
  } catch (e) {
    throw new Error(e);
  }
};
let getAllCart = async (userId) => {
  try {
    let cart = "";
    if (userId && userId !== "ALL") {
      cart = await db.Carts.findAll({
        where: { userId: userId },
      });
    }
    return cart;
  } catch (e) {
    throw new Error(e);
  }
};
let addCart = async (data) => {
  try {
    let user = await db.Carts.findOne({
      where: { userId: data.userId },
    });
    if (!user && user == "") {
      await db.Carts.create({
        userId: data.userId,
        productId: data.productId,
        quantity: data.quantity,
      });
      return {
        errCode: 0,
        message: "Create Cart OK",
      };
    } else {
      let cart = await db.Carts.findOne({
        where: { userId: data.userId, productId: data.productId },
      });
      if (cart) {
        let number = parseInt(cart.quantity + 1);
        (cart.userId = data.userId),
          (cart.productId = data.productId),
          (cart.quantity = number),
          await cart.save();
        return {
          errCode: 0,
          message: "Update Cart OK",
        };
      } else {
        await db.Carts.create({
          userId: data.userId,
          productId: data.productId,
          quantity: data.quantity,
        });
        return {
          errCode: 0,
          message: "Create Cart OK",
        };
      }
    }
  } catch (e) {
    throw new Error(e);
  }
};
let incrementQuantityCart = async (data) => {
  try {
    let userId = data.userId;
    let productId = data.productId;
    if (!userId || !productId) {
      return {
        errCode: 1,
        message: "Missing request Content Cart",
      };
    }
    let cart = await db.Carts.findOne({
      where: { userId: userId, productId: productId },
    });
    if (cart) {
      let number = parseInt(cart.quantity + 1);
      (cart.userId = data.userId),
        (cart.productId = data.productId),
        (cart.quantity = number),
        await cart.save();
      return {
        errCode: 0,
        message: "Update Cart OK",
      };
    } else {
      return {
        errCode: 2,
        message: "Menu not found",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
let decrementQuantityCart = async (data) => {
  try {
    let userId = data.userId;
    let productId = data.productId;
    if (!userId || !productId) {
      return {
        errCode: 1,
        message: "Missing request Content Cart",
      };
    }
    let cart = await db.Carts.findOne({
      where: { userId: userId, productId: productId },
    });
    if (cart) {
      let number = parseInt(cart.quantity - 1);
      (cart.userId = data.userId),
        (cart.productId = data.productId),
        (cart.quantity = number),
        await cart.save();
      let cartNumber = await db.Carts.findOne({
        where: { userId: userId, productId: productId },
      });
      if(cartNumber.quantity==0)
      {
        await deleteItemCart(cartNumber.userId, cart.productId)
      }
      return {
        errCode: 0,
        message: "Update Cart OK",
      };
    } else {
      return {
        errCode: 2,
        message: "Cart not found",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
let deleteItemCart = async (userId, productId) => {
  let cart = await db.Carts.findOne({
    where: { userId: userId, productId: productId },
  });
  if (!cart) {
    return {
      errCode: 2,
      message: "Not Exit ID Product Cart",
    };
  }
  await db.Carts.destroy({
    where: { userId: userId, productId: productId },
  });
  return {
    errCode: 0,
    message: "Delete Product OK",
  };
};
module.exports = {
  addCart: addCart,
  getAllCart: getAllCart,
  incrementQuantityCart: incrementQuantityCart,
  decrementQuantityCart: decrementQuantityCart,
  deleteItemCart: deleteItemCart,
};
