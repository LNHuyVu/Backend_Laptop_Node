import db from "../models/index";
const { Op } = require('sequelize');

let checkPostTitle = async (postTitle) => {
  try {
    let post = await db.Posts.findOne({
      where: { title: postTitle },
    });
    if (post) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    throw new Error(e);
  }
};

let getAllPost = async (postId) => {
  try {
    let post = "";
    if (postId === "ALL") {
      post = await db.Posts.findAll({
        order: [["id", "DESC"]],
      });
    }
    if (postId && postId !== "ALL") {
      post = await db.Posts.findOne({
        // where: { id: postId },
        where: {
          [Op.or]: [{ id: postId }, { slug: postId }],
        },
      });
    }
    return post;
  } catch (e) {
    throw new Error(e);
  }
};
let createNewPost = async (data) => {
  try {
    let check = await checkPostTitle(data.title);
    if (check === true) {
      return {
        errCode: 1,
        message: "Your title post is already in used",
      };
    } else {
      await db.Posts.create({
        title: data.title,
        topId: data.topId,
        slug: data.slug,
        type: data.type,
        detail: data.detail,
        image: data.image,
        createdBy: data.createdBy,
        status: data.status,
      });
      return {
        errCode: 0,
        message: "Create post OK",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
let deletePost = async (postId) => {
  let post = await db.Posts.findOne({
    where: { id: postId },
  });
  if (!post) {
    return {
      errCode: 2,
      message: "Not Exit Post",
    };
  }
  await db.Posts.destroy({
    where: { id: postId },
  });
  return {
    errCode: 0,
    message: "Delete Post OK",
  };
};
let editPost = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: 1,
        message: "Missing request ID Post",
      };
    }
    let post = await db.Posts.findOne({
      where: { id: data.id },
    });
    if (post) {
      (post.title = data.title),
        (post.topId = data.topId),
        (post.slug = data.slug),
        (post.type = data.type),
        (post.detail = data.detail),
        (post.image = data.image),
        (post.createdBy = data.createdBy),
        (post.status = data.status);
      await post.save();
      return {
        errCode: 0,
        message: "Update post OK",
      };
    } else {
      return {
        errCode: 2,
        message: "ID Post not found",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
let getTopIdPost = async (topId) => {
  try {
    let post = "";
    if (topId === "ALL") {
      post = await db.Posts.findAll({
        order: [["id", "DESC"]],
      });
    }
    if (topId && topId !== "ALL") {
      post = await db.Posts.findAll({
        where: { topId: topId },
      });
    }
    return post;
  } catch (e) {
    throw new Error(e);
  }
};
module.exports = {
  getAllPost: getAllPost,
  createNewPost: createNewPost,
  deletePost: deletePost,
  editPost: editPost,
  // 
  getTopIdPost:getTopIdPost
};
