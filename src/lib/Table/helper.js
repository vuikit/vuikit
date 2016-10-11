import { isString } from '../../helpers/util'

export function processSortOrder (field, currentOrder) {
  const newOrder = {}
  const sortBy = field.sortBy === true
    ? field.name
    : field.sortBy
  // prepare the final order object state
  if (currentOrder[sortBy]) {
    newOrder[sortBy] = currentOrder[sortBy] === 'asc'
      ? 'desc'
      : 'asc'
  } else {
    newOrder[sortBy] = 'asc'
  }
  return newOrder
}

export function processFields (fields) {
  return fields.map(f => {
    let field = {
      name: '',
      header: '',
      headerClass: '',
      cellClass: '',
      sortBy: ''
    }
    // set field data
    if (isString(f)) {
      field.name = f
    } else {
      // merge both
      field = {...field, ...f}
    }
    // set default Header
    if (field.header === '') {
      field.header = titleCase(field.name)
    }
    return field
  })
}

function titleCase (str) {
  return str.replace(/\w+/g, txt =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  )
}
