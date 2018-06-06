import { get, assign } from './object'

/*
 * Returns a filtered array of all ascendents
 */
export function findParents (instance, filter) {
  const parents = []
  let parent = instance.$parent

  while (parent) {
    const itPassFilters = !filter || runFilter(parent, filter)

    if (itPassFilters) {
      parents.unshift(parent)
    }

    parent = parent.$parent
  }

  return parents
}

/*
 * Returns a filtered array of all descendents
 */
export function findChildren ($root, filter) {
  let matched = []

  $root.$children.forEach(child => {
    const itPassFilters = !filter || runFilter(child, filter)

    if (itPassFilters) {
      matched.push(child)
    }

    matched = [...matched, ...findChildren(child, filter)]
  })

  return matched
}

function runFilter (instance, filter) {
  return Object.keys(filter).every(key => get(instance, key) === filter[key])
}

/*
 * Resolve childrens as slots
 */
export function resolveSlots (children) {
  return filterOutTextNodes(children).reduce((slots, n) => {
    const name = get(n, 'data.slot', 'default')
    slots[name] = slots[name] || []

    if (n.tag === 'template') {
      slots[name].push.apply(slots[name], n.children || [])
    } else {
      slots[name].push(n)
    }

    return slots
  }, {})
}

// execute a function on instance
// and its children resursively
export function apply (instance, fn) {
  if (!instance || !instance._isVue) {
    return
  }

  fn(instance)
  instance.$children.forEach(child => apply(child, fn))
}

// filter out text nodes (possible whitespaces)
export function filterOutTextNodes (nodes) {
  return nodes.filter(n => n.tag || isAsyncPlaceholder(n))
}

// misc
export function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

// extract all props going through mixins and extends properties
export function extractProps (...args) {
  const props = {}

  for (let i = 0; i < args.length; i++) {
    const def = args[i]

    if (def !== null) {
      def.mixins && def.mixins.forEach(mixin => {
        assign(props, mixin.props || {})
      })

      // the extending component could have it own
      // mixins and extendings, loop it
      def.extends && assign(props, extractProps(def.extends))

      // finally set raw props
      def.props && assign(props, def.props)
    }
  }

  return props
}

/**
 * Intelligently merges data for createElement.
 * Merges arguments left to right, preferring the right argument.
 * Returns new VNodeData object.
 *
 * An adaption of the vue-functional-data-merge 2.0.6 from Alex Regan
 * https://github.com/alexsasharegan/vue-functional-data-merge
*/

export function mergeData () {
  const mergeTarget = {}
  let i = arguments.length
  let prop
  let event

  // Allow for variadic argument length.
  while (i--) {
    // Iterate through the data properties and execute merge strategies
    // Object.keys eliminates need for hasOwnProperty call
    for (var _i = 0, _a = Object.keys(arguments[i]); _i < _a.length; _i++) {
      prop = _a[_i]

      switch (prop) {
        // Array merge strategy (array concatenation)
        case 'class':
        case 'style':
        case 'directives':
          if (!Array.isArray(mergeTarget[prop])) {
            mergeTarget[prop] = []
          }
          // Repackaging in an array allows Vue runtime
          // to merge class/style bindings regardless of type.
          mergeTarget[prop] = mergeTarget[prop].concat(arguments[i][prop])
          break

        // Space delimited string concatenation strategy
        case 'staticClass':
          if (!arguments[i][prop]) {
            break
          }
          if (mergeTarget[prop] === undefined) {
            mergeTarget[prop] = ''
          }
          if (mergeTarget[prop]) {
            // Not an empty string, so concatenate
            mergeTarget[prop] += ' '
          }
          mergeTarget[prop] += arguments[i][prop].trim()
          break
        // Object, the properties of which to merge via array merge strategy (array concatenation).
        // Callback merge strategy merges callbacks to the beginning of the array,
        // so that the last defined callback will be invoked first.
        // This is done since to mimic how Object.assign merging
        // uses the last given value to assign.
        case 'on':
        case 'nativeOn':
          if (!mergeTarget[prop]) {
            mergeTarget[prop] = {}
          }
          for (var _b = 0, _c = Object.keys(arguments[i][prop] || {}); _b < _c.length; _b++) {
            event = _c[_b]
            // Concat function to array of functions if callback present.
            if (mergeTarget[prop][event]) {
              // Insert current iteration data in beginning of merged array.
              mergeTarget[prop][event] = [].concat(mergeTarget[prop][event], arguments[i][prop][event])
            } else {
              // Straight assign.
              mergeTarget[prop][event] = arguments[i][prop][event]
            }
          }
          break
        // Object merge strategy
        case 'attrs':
        case 'props':
        case 'domProps':
        case 'scopedSlots':
        case 'staticStyle':
        case 'hook':
        case 'transition':
          if (!mergeTarget[prop]) {
            mergeTarget[prop] = {}
          }
          mergeTarget[prop] = assign({}, arguments[i][prop], mergeTarget[prop])
          break
        // Reassignment strategy (no merge)
        case 'slot':
        case 'key':
        case 'ref':
        case 'tag':
        case 'show':
        case 'keepAlive':
        default:
          if (!mergeTarget[prop]) {
            mergeTarget[prop] = arguments[i][prop]
          }
      }
    }
  }

  return mergeTarget
}
