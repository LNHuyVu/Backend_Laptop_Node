import db from "../models/index";
const { Op } = require('sequelize');
let checkTopicName = async (topicName) => {
  try {
    let topic = await db.Topics.findOne({
      where: { name: topicName },
    });
    if (topic) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    throw new Error(e);
  }
};

let getAllTopic = async (topicId) => {
  try {
    let topic = "";
    if (topicId === "ALL") {
      topic = await db.Topics.findAll({});
    }
    if (topicId && topicId !== "ALL") {
      topic = await db.Topics.findOne({
        // where: { id: topicId },
        where: {
          [Op.or]: [{ id: topicId }, { slug: topicId }],
        },
      });
    }
    return topic;
  } catch (e) {
    throw new Error(e);
  }
};
let createNewTopic = async (data) => {
  try {
    let check = await checkTopicName(data.name);
    if (check === true) {
      return {
        errCode: 1,
        message: "Your name topic is already in used",
      };
    } else {
      await db.Topics.create({
        name: data.name,
        slug: data.slug,
        parentId: data.parentId,
        status: data.status,
      });
      return {
        errCode: 0,
        message: "Create Topic OK",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
let deleteTopic = async (topicId) => {
  let topic = await db.Topics.findOne({
    where: { id: topicId },
  });
  if (!topic) {
    return {
      errCode: 2,
      message: "Not Exit Topic",
    };
  }
  await db.Topics.destroy({
    where: { id: topicId },
  });
  return {
    errCode: 0,
    message: "Delete Topic OK",
  };
};
let editTopic = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: 1,
        message: "Missing request ID",
      };
    }
    let topic = await db.Topics.findOne({
      where: { id: data.id },
    });
    if (topic) {
      (topic.name = data.name),
        (topic.slug = data.slug),
        (topic.parentId = data.parentId),
        (topic.createdBy = data.createdBy),
        (topic.status = data.status);
      await topic.save();
      return {
        errCode: 0,
        message: "Update topic OK",
      };
    } else {
      return {
        errCode: 2,
        message: "Topic not found",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
module.exports = {
  getAllTopic: getAllTopic,
  createNewTopic: createNewTopic,
  deleteTopic: deleteTopic,
  editTopic: editTopic,
};
