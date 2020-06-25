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

    if (!params.rowData.length) {
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
    } else if (params.searchKey === "all") {
      result = params.rowData;
    } else {
      result = params.rowData.filter((v) =>
        v[params.searchKey].includes(params.searchWord)
      );
    }

    return result;
  },

  deleteTaskList: ({ currentTaskTableKey }) => {
    const storedList = util.getStoredList(lmsListLocation);

    delete storedList[currentTaskTableKey];

    util.saveFile(storedList, lmsListLocation);
  },

  getAllTaskList: () => {
    return JSON.parse(fs.readFileSync(lmsListLocation, env.fileEncoding));
  },

  getTaskList: ({ currentTaskTableKey, searchKey, searchWord }) => {
    const storedList = util.getStoredList(lmsListLocation);

    return storedList[currentTaskTableKey]["table"].filter((v) =>
      searchKey && searchWord
        ? v.taskStatus === false && v[searchKey].includes(searchWord)
        : v.taskStatus === false
    );
  },

  getResolvedTaskList: ({ currentTaskTableKey, searchKey, searchWord }) => {
    const storedList = util.getStoredList(lmsListLocation);

    return storedList[currentTaskTableKey]["table"].filter((v) =>
      searchKey && searchWord
        ? v.taskStatus === true && v[searchKey].includes(searchWord)
        : v.taskStatus === true
    );
  },

  saveTaskList: ({ tableName, data }) => {
    const storedList = util.getStoredList(lmsListLocation);

    storedList[tableName] = {};
    storedList[tableName]["table"] = data;
    storedList[tableName]["createdAt"] = util.formatedTimestamp();

    util.saveFile(storedList, lmsListLocation);
  },

  submitTask: ({ key, currentTaskTableKey }) => {
    const storedList = util.getStoredList(lmsListLocation);

    storedList[currentTaskTableKey]["table"].find(
      (v) => v.key === key
    ).taskStatus = true;

    util.saveFile(storedList, lmsListLocation);
  },

  writeTaskContent: ({ key, currentTaskTableKey, taskContent }) => {
    const storedList = util.getStoredList(lmsListLocation);

    storedList[currentTaskTableKey]["table"].find(
      (v) => v.key === key
    ).taskContent = taskContent;

    util.saveFile(storedList, lmsListLocation);
  },

  checkDuplicateTableName: ({ value }) => {
    const storedList = fs.readFileSync(lmsListLocation, env.fileEncoding);

    return JSON.parse(storedList).hasOwnProperty(value);
  },
};
