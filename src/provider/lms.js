const express = require("express");
const router = express.Router();
const action = require("actions/lms.action.js");

router.post("/getTaskList", async (req, res) => {
  const result = await action.getTaskList(req.body);

  res.send(result);
});

router.post("/saveTaskList", async (req, res) => {
  const result = await action.saveTaskList(req.body);

  res.send(result);
});

module.exports = router;
