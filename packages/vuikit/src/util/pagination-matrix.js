import { range as getRange } from 'vuikit/src/util/misc'

/**
 * Returns an array with represented ranges pages
 */
export default function ({ total = 200, page = 1, perPage = 10, range = 3 } = {}) {
  const matrix = []
  const totalPages = Math.ceil(total / perPage)
  // return early if no more than 1 page
  if (totalPages < 2) {
    return [1]
  }
  // get main pages
  const mainPages = getMainPages({ page, range, totalPages })
  const first = mainPages[0]
  const last = mainPages[mainPages.length - 1]
  // get pre/post pages
  const prePages = getRange(1, (first <= 3) ? first : 2)
  const postPages = getRange(
    last >= (totalPages - 2) ? last + 1 : totalPages,
    totalPages + 1
  )

  let nextPage = 1
  ;[].concat(prePages, mainPages, postPages).forEach(p => {
    if (p === nextPage) {
      matrix.push(p)
      nextPage++
    } else {
      matrix.push('...')
      matrix.push(p)
      nextPage = p + 1
    }
  })

  return matrix
}

const getMainPages = ({ page, range, totalPages }) => {
  let start = page - range
  let end = page + range
  if (end > totalPages) {
    end = totalPages
    start = totalPages - (range * 2)
    start = start < 1 ? 1 : start
  }
  if (start <= 1) {
    start = 1
    end = Math.min((range * 2) + 1, totalPages)
  }

  return getRange(start, end + 1)
}
