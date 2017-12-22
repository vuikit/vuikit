import getRange from '@vuikit/core/utils/range';

var def = { total: 200, page: 1, perPage: 10, range: 3 };

/**
 * Returns an array with represented ranges pages
 */
function paginationMatrix (ref) {
  if ( ref === void 0 ) ref = def;
  var total = ref.total; if ( total === void 0 ) total = def.total;
  var page = ref.page; if ( page === void 0 ) page = def.page;
  var perPage = ref.perPage; if ( perPage === void 0 ) perPage = def.perPage;
  var range = ref.range; if ( range === void 0 ) range = def.range;

  var matrix = [];
  var totalPages = Math.ceil(total / perPage);
  // return early if no more than 1 page
  if (totalPages < 2) {
    return [1]
  }
  // get main pages
  var mainPages = getMainPages({ page: page, range: range, totalPages: totalPages });
  var first = mainPages[0];
  var last = mainPages[mainPages.length - 1];
  // get pre/post pages
  var prePages = getRange(1, (first <= 3) ? first : 2);
  var postPages = getRange(
    last >= (totalPages - 2) ? last + 1 : totalPages,
    totalPages + 1
  );

  var nextPage = 1;[].concat(prePages, mainPages, postPages).forEach(function (p) {
    if (p === nextPage) {
      matrix.push(p);
      nextPage++;
    } else {
      matrix.push('...');
      matrix.push(p);
      nextPage = p + 1;
    }
  });

  return matrix
}

var getMainPages = function (ref) {
  var page = ref.page;
  var range = ref.range;
  var totalPages = ref.totalPages;

  var start = page - range;
  var end = page + range;
  if (end > totalPages) {
    end = totalPages;
    start = totalPages - (range * 2);
    start = start < 1 ? 1 : start;
  }
  if (start <= 1) {
    start = 1;
    end = Math.min((range * 2) + 1, totalPages);
  }

  return getRange(start, end + 1)
};

export default paginationMatrix;
