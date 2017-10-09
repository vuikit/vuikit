/*
 * Filter out text nodes (possible whitespaces, comments, ...)
 */
export default function (nodes) {
  return nodes.filter(c => c.tag || isAsyncPlaceholder(c))
}

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}
