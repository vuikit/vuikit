import mergeData from 'vue-functional-data-merge'

export default {
  functional: true,
  render (h, { data, listeners, children }) {
    const def = {
      class: ['uk-icon', 'uk-icon-button']
    }

    return h('a', mergeData(data, def), children)
  }
}
