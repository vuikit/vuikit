import { get } from './misc'
import { assign } from './lang'

/*
 * Returns the closest parent of same type
 */
export function findParent (instance) {
  return findParents(instance).pop()
}

/*
 * Returns closest parents of same type
 */
export function findParents (instance) {
  const parents = []
  const name = instance.$options.name

  let parent = instance.$parent

  while (parent) {
    if (parent.$options.name === name) {
      parents.unshift(parent)
    }

    parent = parent.$parent
  }

  return parents
}

/*
 * Returns all descendant childs of same type
 */
export function findChilds (instance) {
  const name = instance.$options.name

  let childs = instance.$children
    .filter(child => child.$options.name === name)

  childs.forEach(child => {
    childs = [...childs, ...findChilds(child)]
  })

  return childs
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

/* eslint-disable */
// vue-functional-data-merge 2.0.3 from Alex Regan - https://github.com/alexsasharegan/vue-functional-data-merge
export function mergeData () {
  for(var e,a,s={},t=arguments.length;t--;)for(var r=0,c=Object.keys(arguments[t]);r<c.length;r++)switch(e=c[r]){case"class":case"style":case"directives":Array.isArray(s[e])||(s[e]=[]),s[e]=s[e].concat(arguments[t][e]);break;case"staticClass":if(!arguments[t][e])break;void 0===s[e]&&(s[e]=""),s[e]&&(s[e]+=" "),s[e]+=arguments[t][e].trim();break;case"on":case"nativeOn":s[e]||(s[e]={});for(var o=0,n=Object.keys(arguments[t][e]);o<n.length;o++)a=n[o],s[e][a]?s[e][a]=[].concat(s[e][a],arguments[t][e][a]):s[e][a]=arguments[t][e][a];break;case"attrs":case"props":case"domProps":case"scopedSlots":case"staticStyle":case"hook":case"transition":s[e]||(s[e]={}),s[e]=__assign({},arguments[t][e],s[e]);break;case"slot":case"key":case"ref":case"tag":case"show":case"keepAlive":default:s[e]||(s[e]=arguments[t][e])}return s}var __assign=Object.assign||function(e){for(var a,s=1,t=arguments.length;s<t;s++){a=arguments[s];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e
}
