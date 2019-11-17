const domTransform = require("metalsmith-dom-transform");
const linNumbersTransform = require("./transform");

module.exports = function(options) {
  return domTransform({
    transforms: [linNumbersTransform(options)]
  });
};
