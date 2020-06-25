const express = require("express");
const router = express.Router();

/** load LMS API */
const action = require("../actions/lms.action.js");

router.post("/generateTaskList", async (req, res) => {
  const result = await action.generateTaskList(req.body);

  res.send(result);
});

router.post("/getTaskList", async (req, res) => {
  const result = await action.getTaskList(req.body);

  res.send(result);
});

router.post("/getAllTaskList", async (req, res) => {
  const result = await action.getAllTaskList(req.body);

  res.send(result);
});

router.post("/getResolvedTaskList", async (req, res) => {
  const result = await action.getResolvedTaskList(req.body);

  res.send(result);
});

router.post("/saveTaskList", async (req, res) => {
  const result = action.saveTaskList(req.body);

  res.send(result);
});

router.post("/submitTask", async (req, res) => {
  const result = action.submitTask(req.body);

  res.send(result);
});

router.post("/writeTaskContent", async (req, res) => {
  const result = action.writeTaskContent(req.body);

  res.send(result);
});

router.post("/checkDuplicateTableName", async (req, res) => {
  const result = await action.checkDuplicateTableName(req.body);

  res.send(result);
});

module.exports = router;
