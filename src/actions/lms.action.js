/** load assets info */
const P = require("../assets/professorList");
const S = require("../assets/subjectList");
const T = require("../assets/taskList");

/** load utils, env ... */
const util = require("../utils/common");
const env = require("../config/env");

/** load file system */
const fs = require("fs");

/** set location */
const lmsListLocation = __dirname + env.collectionFileStream;

/** API start */
module.exports = {
  generateTaskList: (params) => {
    let result = [];
    let c = 0;

    while (!((c === 10 && result.length > 5) || result.length === 10)) {
      c += 1;
      const formGroup = {};

      const rS = util.randomProperty(S);
      const rSK = rS.keyName;
      const rT = T[rSK][(T[rSK].length * Math.random()) << 0];

      formGroup.key = result.length + 1;
      formGroup.subjectName = rS.valueName;
      formGroup.subjectKey = rS.keyName;
      formGroup.professorName = P[rSK];
      formGroup.taskName = rT.title;
      formGroup.taskDesc = rT.desc;
      formGroup.taskStatus = false;
      formGroup.dueDate = util.formatedTimestamp(
        util.randomDate(800000000),
        true
      );

      const fa = result.filter((v) => v.taskName === formGroup.taskName);

      /** filter duplicate */
      if (!fa.length) {
        result.push(formGroup);
      }
    }

    return result;
  },

  deleteTaskList: async ({
    currentTaskTableKey
  }) => {
    const storedList = await util.getStoredList(lmsListLocation);

    delete storedList[currentTaskTableKey];

    await util.saveFile(storedList, lmsListLocation);
  },

  destoryTaskList: async () => {
    await util.saveFile({}, lmsListLocation);

    return 'success';
  },

  getAllTaskList: async () => {
    return await JSON.parse(fs.readFileSync(lmsListLocation, env.fileEncoding));
  },

  getTaskList: async ({
    currentTaskTableKey,
    searchKey,
    searchWord
  }) => {
    const storedList = await util.getStoredList(lmsListLocation);

    return await storedList[currentTaskTableKey]["table"].filter((v) =>
      searchKey && searchWord ?
      v.taskStatus === false && v[searchKey].includes(searchWord) :
      v.taskStatus === false
    );
  },

  getResolvedTaskList: async ({
    currentTaskTableKey,
    searchKey,
    searchWord
  }) => {
    const storedList = await util.getStoredList(lmsListLocation);

    return await storedList[currentTaskTableKey]["table"].filter((v) =>
      searchKey && searchWord ?
      v.taskStatus === true && v[searchKey].includes(searchWord) :
      v.taskStatus === true
    );
  },

  saveTaskList: async ({
    tableName,
    data
  }) => {
    const storedList = await util.getStoredList(lmsListLocation);

    storedList[tableName] = {};
    storedList[tableName]["table"] = data;
    storedList[tableName]["createdAt"] = util.formatedTimestamp();

    await util.saveFile(storedList, lmsListLocation);
  },

  submitTask: async ({
    key,
    currentTaskTableKey
  }) => {
    const storedList = await util.getStoredList(lmsListLocation);

    storedList[currentTaskTableKey]["table"].find(
      (v) => v.key === key
    ).taskStatus = true;

    await util.saveFile(storedList, lmsListLocation);
  },

  writeTaskContent: async ({
    key,
    currentTaskTableKey,
    taskContent
  }) => {
    const storedList = await util.getStoredList(lmsListLocation);

    storedList[currentTaskTableKey]["table"].find(
      (v) => v.key === key
    ).taskContent = taskContent;

    await util.saveFile(storedList, lmsListLocation);
  },

  checkDuplicateTableName: ({
    value
  }) => {
    const storedList = fs.readFileSync(lmsListLocation, env.fileEncoding);

    return JSON.parse(storedList).hasOwnProperty(value);
  },
};
