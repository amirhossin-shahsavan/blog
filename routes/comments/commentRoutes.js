const express = require("express");

const commentRoutes = express.Router();

commentRoutes.post("/", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "comment created",
    });
  } catch (error) {
    res.json(error.message);
  }
});

commentRoutes.get("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "comment is find",
    });
  } catch (error) {
    res.json(error.message);
  }
});

commentRoutes.put("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "comment put",
    });
  } catch (error) {
    res.json(error.message);
  }
});

commentRoutes.delete("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "comment delete",
    });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = commentRoutes;
