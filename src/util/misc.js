// filter out text nodes (possible whitespaces)
export function filterOutEmptyNodes (nodes) {
  return nodes.filter(c => c.tag || isAsyncPlaceholder(c))
}

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}
