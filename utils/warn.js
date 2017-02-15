/**
 * Warn about errors only in no production
 */

var warn

if (process.env.NODE_ENV !== 'production') {
  const hasConsole = typeof console !== 'undefined'
  warn = (msg) => {
    if (hasConsole) {
      console.error(msg)
    }
  }
}

module.exports = warn
