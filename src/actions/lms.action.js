const P = require("assets/professorList");
const S = require("assets/subjectList");
const T = require("assets/taskList");

const util = require("utils/common");

module.exports = {
  getTaskList: async (params) => {
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
        formGroup.dueDate = util.randomDate(800000000);

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

  saveTaskList: async (params) => {
    console.log(params);

    return "success";
  },
};
