const TABLE_NAME = "hljs-ln",
  LINE_NAME = "hljs-ln-line",
  CODE_BLOCK_NAME = "hljs-ln-code",
  NUMBERS_BLOCK_NAME = "hljs-ln-numbers",
  NUMBER_LINE_NAME = "hljs-ln-n",
  DATA_ATTR_NAME = "data-line-number",
  BREAK_LINE_REGEXP = /\r\n|\r|\n/g;

module.exports = {
  lineNumbersBlock: function(element, options) {
    if (typeof element !== "object") return;

    // define options or set default
    options = options || {
      singleLine: false
    };

    // convert options
    var firstLineIndex = !!options.singleLine ? 0 : 1;

    duplicateMultilineNodes(element);

    element.innerHTML = addLineNumbersBlockFor(
      element.innerHTML,
      firstLineIndex
    );
  }
};

function addLineNumbersBlockFor(inputHtml, firstLineIndex) {
  var lines = getLines(inputHtml);

  // if last line contains only carriage return remove it
  if (lines[lines.length - 1].trim() === "") {
    lines.pop();
  }

  if (lines.length > firstLineIndex) {
    var html = "";

    for (var i = 0, l = lines.length; i < l; i++) {
      html += format(
        "<tr>" +
          '<td class="{0}">' +
          '<div class="{1} {2}" {3}="{5}"></div>' +
          "</td>" +
          '<td class="{4}">' +
          '<div class="{1}">{6}</div>' +
          "</td>" +
          "</tr>",
        [
          NUMBERS_BLOCK_NAME,
          LINE_NAME,
          NUMBER_LINE_NAME,
          DATA_ATTR_NAME,
          CODE_BLOCK_NAME,
          i + 1,
          lines[i].length > 0 ? lines[i] : " "
        ]
      );
    }

    return format('<table class="{0}">{1}</table>', [TABLE_NAME, html]);
  }

  return inputHtml;
}

/**
 * Recursive method for fix multi-line elements implementation in highlight.js
 * Doing deep passage on child nodes.
 * @param {HTMLElement} element
 */
function duplicateMultilineNodes(element) {
  var nodes = element.childNodes;
  for (var node in nodes) {
    if (nodes.hasOwnProperty(node)) {
      var child = nodes[node];
      if (getLinesCount(child.textContent) > 0) {
        if (child.childNodes.length > 0) {
          duplicateMultilineNodes(child);
        } else {
          duplicateMultilineNode(child.parentNode);
        }
      }
    }
  }
}

/**
 * Method for fix multi-line elements implementation in highlight.js
 * @param {HTMLElement} element
 */
function duplicateMultilineNode(element) {
  var className = element.className;

  if (!/hljs-/.test(className)) return;

  var lines = getLines(element.innerHTML);

  for (var i = 0, result = ""; i < lines.length; i++) {
    var lineText = lines[i].length > 0 ? lines[i] : " ";
    result += format('<span class="{0}">{1}</span>\n', [className, lineText]);
  }

  element.innerHTML = result.trim();
}

function getLines(text) {
  if (text.length === 0) return [];
  return text.split(BREAK_LINE_REGEXP);
}

function getLinesCount(text) {
  return (text.trim().match(BREAK_LINE_REGEXP) || []).length;
}

/**
 * {@link https://wcoder.github.io/notes/string-format-for-string-formating-in-javascript}
 * @param {string} format
 * @param {array} args
 */
function format(format, args) {
  return format.replace(/\{(\d+)\}/g, function(m, n) {
    return args[n] ? args[n] : m;
  });
}
