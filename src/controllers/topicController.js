import topicService from "../services/topicService";
let handleGetAllTopic = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "Not Exit Topic ID",
      topic: [],
    });
  }
  let topic = await topicService.getAllTopic(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    topic,
  });
};
let handleCreateNewTopic = async (req, res) => {
  let message = await topicService.createNewTopic(req.body);
  return res.status(200).json(message);
};
let handleDeleteTopic = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing ID Topic",
    });
  }
  let message = await topicService.deleteTopic(req.body.id);
  return res.status(200).json(message);
};
let handleEditTopic = async (req, res) => {
  let data = req.body;
  let message = await topicService.editTopic(data);
  return res.status(200).json(message);
};
module.exports = {
  handleGetAllTopic: handleGetAllTopic,
  handleCreateNewTopic: handleCreateNewTopic,
  handleDeleteTopic: handleDeleteTopic,
  handleEditTopic: handleEditTopic,
};
