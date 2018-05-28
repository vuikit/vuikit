// A simple directive that places the element in the App $root.
// This is useful for Drop elements and similar to avoid picking up styles
// from parent nodes but still inside the app root which styles could be scoped.
export default {
  inserted (el, binding, vnode) {
    vnode.context.$nextTick(() => {
      vnode.context.$root.$el.appendChild(el)
    })
  }
}
