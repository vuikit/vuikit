let warn

if (process.env.NODE_ENV !== 'production') {
  const hasConsole = typeof console !== 'undefined'

  warn = (msg, vm) => {
    if (hasConsole) {
      console.error('[Vuikit warn]: ' + msg)
    }
  }
}

export { warn }
