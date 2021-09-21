const getConfig = require("./main.config.js");
const dev = require("./dev/config.js");
const stg = require("./stg/config.js");
const prod = require("./prod/config.js");

const configs = {
  dev,
  stg,
  prod,
};

// eslint-disable-next-line func-names
module.exports = function (env) {
  return getConfig(configs[env].config);
};
