import mergeData from 'vuikit/core/util/vue-data-merge'

export default {
  functional: true,
  render (h, { data, parent, children }) {
    const { beforeEnter, enter, afterEnter, beforeLeave, leave, afterLeave } = parent

    const def = {
      props: {
        css: false,
        appear: true
      },
      on: {
        beforeEnter,
        enter,
        afterEnter,
        beforeLeave,
        leave,
        afterLeave
      }
    }

    return h('transition', mergeData(data, def), children)
  }
}
