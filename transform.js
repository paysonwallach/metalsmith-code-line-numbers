const lineNumbers = require("./line-numbers");
const defaults = {selector: "pre > code"};

module.exports = function(options) {
  let normalizedOptions = Object.assign({}, defaults, options);
  let {selector} = normalizedOptions;

  return function highlightContent(root, data, metalsmith, done) {
    Array.from(root.querySelectorAll(selector)).forEach(node => {
      lineNumbers.lineNumbersBlock(node);

      // Tag the parent node as well for style adjustments
      if (node.parentNode && node.parentNode.classList) {
        node.parentNode.classList.add("lang-highlight");
      }
    });

    done();
  };
};
