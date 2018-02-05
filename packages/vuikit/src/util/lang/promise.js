import promiseFn from '../promise'

export default 'Promise' in window
  ? window.Promise
  : promiseFn
