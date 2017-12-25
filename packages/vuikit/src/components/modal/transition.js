import mergeData from '@vuikit/core/helpers/vue-data-merge'

export default {
  functional: true,
  render (h, { parent: modal, children, data }) {
    const def = {
      props: {
        css: false
      },
      on: {
        beforeEnter: modal.beforeEnter,
        enter: modal.enter,
        afterEnter: modal.afterEnter,
        beforeLeave: modal.beforeLeave,
        leave: modal.leave,
        afterLeave: modal.afterLeave
      }
    }

    return h('transition', mergeData(data, def), children)
  }
}
