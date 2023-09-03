const express = require("express");

const categoryRoutes = express.Router();

categoryRoutes.post("/", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "category created",
    });
  } catch (error) {
    res.json(error.message);
  }
});

categoryRoutes.get("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "category is find",
    });
  } catch (error) {
    res.json(error.message);
  }
});

categoryRoutes.put("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "category put",
    });
  } catch (error) {
    res.json(error.message);
  }
});

categoryRoutes.delete("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "category delete",
    });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = categoryRoutes;
