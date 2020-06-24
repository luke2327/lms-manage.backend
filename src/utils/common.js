module.exports = {
  randomProperty: (obj) => {
    const keys = Object.keys(obj);
    const rKey = keys.length * Math.random() << 0;
    const keyName = keys[rKey];
    const valueName = obj[keys[rKey]];

    return {
      keyName,
      valueName
    };
  },

  randomDate: (seed) => {
    return new Date(+(new Date()) + Math.floor(Math.random() * seed));
  }
}