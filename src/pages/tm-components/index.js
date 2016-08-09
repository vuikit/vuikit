import Tabs from './Tabs'
import TabsItem from './TabsItem'

const TmComponents = {
  Tabs,
  TabsItem,
  install (Vue) {
    const keys = Object.keys(this)
    keys.pop() // remove 'install' from keys
    let i = keys.length
    while (i--) {
      Vue.component(`Tm${keys[i]}`, this[keys[i]])
    }
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(TmComponents)
}

module.exports = TmComponents
