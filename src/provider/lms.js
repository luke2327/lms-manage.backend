const express = require("express");
const router = express.Router();

/** load LMS API */
const action = require("../actions/lms.action.js");

/** error handler */
const catchAsync = fn => (req, res, next) => fn(req, res, next).catch(next);

router.post("/generateTaskList", catchAsync(async (req, res) => {
  const result = action.generateTaskList(req.body);

  res.send(result);
}));

router.post("/deleteTaskList", catchAsync(async (req, res) => {
  const result = action.deleteTaskList(req.body);

  res.send(result);
}));

router.post("/destoryTaskList", catchAsync(async (req, res) => {
  const result = action.destoryTaskList(req.body);

  res.send(result);
}));

router.post("/getTaskList", catchAsync(async (req, res) => {
  const result = await action.getTaskList(req.body);

  res.send(result);
}));

router.post("/getAllTaskList", catchAsync(async (req, res) => {
  const result = await action.getAllTaskList(req.body);

  res.send(result);
}));

router.post("/getResolvedTaskList", catchAsync(async (req, res) => {
  const result = await action.getResolvedTaskList(req.body);

  res.send(result);
}));

router.post("/saveTaskList", catchAsync(async (req, res) => {
  const result = action.saveTaskList(req.body);

  res.send(result);
}));

router.post("/submitTask", catchAsync(async (req, res) => {
  const result = action.submitTask(req.body);

  res.send(result);
}));

router.post("/writeTaskContent", catchAsync(async (req, res) => {
  const result = action.writeTaskContent(req.body);

  res.send(result);
}));

router.post("/checkDuplicateTableName", catchAsync(async (req, res) => {
  const result = await action.checkDuplicateTableName(req.body);

  res.send(result);
}));

module.exports = router;