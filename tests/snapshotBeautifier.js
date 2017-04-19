const beautify = require('js-beautify').html

module.exports = {
  test (object) {
    // assume that if is a string and starts with < is html
    return typeof object === 'string' && object[0] === '<'
  },
  print (val, print, opts, colors) {
    return beautifyHTML(val, {})
  }
}

function beautifyHTML (str) {
  return beautify(str, {
    indent_char: ' ',
    indent_size: 2,
    indent_inner_html: true,
    unformatted: ['code', 'pre', 'em', 'strong', 'span']
  })
  // remove VueServerRenderer reference
  .replace(' server-rendered="true"', '')
  // remove any empty lines at the top of a file.
  .replace(/^\s*/g, '')
  // normalize and condense all newlines
  .replace(/(\r\n|\n){2,}/g, '\n')
  // trim <a> inner space
  .replace(/(<a.*>)(\s*)(\S+)(\s*)(<\/a>)/g, '$1$3$5')
  // trim <span> inner space
  .replace(/(<span.*>)(\s*)(\S+)(\s*)(<\/span>)/g, '$1$3$5')
  // make <li><a></li> on one line, but only when li > a
  .replace(/(<li>)(\s*)(<a.*)(\s*)(<\/li>)/g, '$1$3$5')
}
