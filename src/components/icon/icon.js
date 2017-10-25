import mergeData from 'vue-functional-data-merge'

export default {
  functional: true,
  render (h, { data, children }) {
    const def = {
      class: ['uk-icon']
    }

    return h('span', mergeData(data, def), children)
  }
}
