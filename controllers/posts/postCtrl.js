const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
const { appErr } = require("../../utils/appErr");

const createpostCtrl = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const auther = await User.findById(req.userAuth);

    const postCreated = await Post.create({
      title,
      description,
      user: auther._id,
    });

    auther.posts.push(postCreated);

    await auther.save();
    res.json({
      status: "success",
      data: postCreated,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const postDetailsCtrl = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    res.json({
      status: "success",
      data: "post details route",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const deletepostCtrl = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    res.json({
      status: "success",
      data: "post delete route",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const updatepostCtrl = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    res.json({
      status: "success",
      data: "post update route",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};
module.exports = {
  createpostCtrl,
  postDetailsCtrl,
  deletepostCtrl,
  updatepostCtrl,
};
