import mergeData from 'vue-functional-data-merge'

export default {
  functional: true,
  render (h, { children, data }) {
    const def = {
      class: ['uk-modal-footer']
    }

    return h('div', mergeData(data, def), children)
  }
}
