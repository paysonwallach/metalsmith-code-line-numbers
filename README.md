# metalsmith-code-line-numbers

Add line numbers to code blocks à la [HighlightJS](https://github.com/isagalaev/highlight.js).

## Usage

The following styles must be injected into the page for line numbers to be visible:

```css
.hljs-ln {
  border-collapse: collapse;
}

.hljs-ln-n:before {
  content: attr(data-line-number);
}
```

Line numbers may further be styled by targeting the `hljs-ln-numbers` class.

## Configuration

By default, only `<code>` elements wrapped by `<pre>` tags will be modified. You can override the target selector by passing a `selector` option in the plugin's config object, e.g. `{ selector: 'code' }` (This will add line numbers to all code elements, including in-line ones).

## Using with `metalsmith-dom-transform`

If you're already using [metalsmith-dom-transform](https://github.com/fortes/metalsmith-dom-transform), you can save a little bit of overhead by accessing the line-numbering transform directly:

```js
const domTransform = require('metalsmith-dom-transform');
const codeLineNumbersTransform = require('metalsmith-code-line-numbers/transform');

metalsmith.use(domTransform({
  transforms: [
    codeLineNumbersTransform(options),
    // Other transforms
  ]
}));
```
