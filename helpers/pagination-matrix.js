import { range as _range } from './util'

/**
 * Returns an array with represented ranges pages
 */
export default function ({ active = 1, total = 200, limit = 10, range = 3 }) {
  const matrix = []
  const totalPages = Math.ceil(total / limit)
  // get main pages
  const mainPages = getMainPages({ active, range, totalPages })
  const first = mainPages[0]
  const last = mainPages[mainPages.length - 1]
  // get pre/post pages
  const prePages = _range(1, (first <= 3) ? first : 2)
  const postPages = _range(
    last >= (totalPages - 2) ? last + 1 : totalPages,
    totalPages + 1
  )

  let nextPage = 1
  ;[].concat(prePages, mainPages, postPages).forEach(page => {
    if (page === nextPage) {
      matrix.push(page)
      nextPage++
    } else {
      matrix.push('...')
      matrix.push(page)
      nextPage = page + 1
    }
  })

  return matrix
}

const getMainPages = ({ active, range, totalPages }) => {
  let start = active - range
  let end = active + range
  if (end > totalPages) {
    end = totalPages
    start = totalPages - range * 2
    start = start < 1 ? 1 : start
  }
  if (start <= 1) {
    start = 1
    end = Math.min(range * 2 + 1, totalPages)
  }
  return _range(start, end + 1)
}
