const env = require("../config/env");
const fs = require("fs");

module.exports = {
  randomProperty: (obj) => {
    const keys = Object.keys(obj);
    const rKey = (keys.length * Math.random()) << 0;
    const keyName = keys[rKey];
    const valueName = obj[keys[rKey]];

    return {
      keyName,
      valueName,
    };
  },

  randomDate: (seed) => {
    return new Date(+new Date() + Math.floor(Math.random() * seed));
  },

  formatedTimestamp: (dateObject, onlyDate) => {
    const d = dateObject ? dateObject : new Date();
    const date = d.toISOString().split("T")[0];
    const time = d.toTimeString().split(" ")[0];

    return `${date}${onlyDate ? "" : " " + time}`;
  },

  saveFile: (storedList, location) => {
    fs.writeFileSync(
      location,
      JSON.stringify(storedList, null, 2),
      env.fileEncoding
    );
  },

  getStoredList: (location) => {
    return JSON.parse(fs.readFileSync(location, env.fileEncoding));
  },
};
