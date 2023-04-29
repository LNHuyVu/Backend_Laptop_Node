import postService from "../services/postService";
let handleGetAllPost = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing ID Post",
      post: [],
    });
  }
  let post = await postService.getAllPost(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    post,
  });
};
let handleCreateNewPost = async (req, res) => {
  let message = await postService.createNewPost(req.body);
  if(message.errCode==0)
  {
    return res.status(200).json(message);
  }
  else{
    return res.status(500).json(message);
  }
};
let handleDeletePost = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing ID Post",
    });
  }
  let message = await postService.deletePost(req.body.id);
  return res.status(200).json(message);
};
let handleEditPost = async (req, res) => {
  let data = req.body;
  let message = await postService.editPost(data);
  return res.status(200).json(message);
};
let handleGetTopIdPost= async (req, res) => {
  let topId = req.query.topId;
  if (!topId) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing ID Post",
      post: [],
    });
  }
  let post = await postService.getTopIdPost(topId);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    post,
  });
};
module.exports = {
  handleGetAllPost: handleGetAllPost,
  handleCreateNewPost: handleCreateNewPost,
  handleDeletePost: handleDeletePost,
  handleEditPost: handleEditPost,
  // Cus
  handleGetTopIdPost:handleGetTopIdPost
};
