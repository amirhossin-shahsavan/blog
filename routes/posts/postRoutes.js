const express = require("express");
const {
  createpostCtrl,
  postDetailsCtrl,
  deletepostCtrl,
  updatepostCtrl,
} = require("../../controllers/posts/postCtrl");
const postRoutes = express.Router();
const isLogin = require("../../middlewares/isLogin");

postRoutes.post("/", isLogin, createpostCtrl);

postRoutes.get("/:id", isLogin, postDetailsCtrl);

postRoutes.get("/", isLogin, postDetailsCtrl);

postRoutes.put("/:id", isLogin, updatepostCtrl);

postRoutes.delete("/:id", isLogin, deletepostCtrl);

module.exports = postRoutes;
