import { warn } from '~/helpers/debug'
import { includes } from '@vuikit/util'
import filterNodes from '~/helpers/node/filter'

export default {
  functional: true,
  render (h, { data, props, children, listeners }) {
    const buttons = filterNodes(children)

    if (!validate(data, buttons)) {
      return
    }

    const groupValue = data.model.value

    buttons.forEach(btn => {
      const value = btn.data.attrs.value

      if (value === groupValue) {
        btn.data.class.push('uk-active')
      }

      btn.data.on = {
        click: () => listeners.input(value)
      }
    })

    return h('div', {
      class: ['uk-button-group']
    }, [
      children
    ])
  }
}

function validate (data, buttons) {
  // check group def
  if (!data.model) {
    warn('ButtonGroupRadio declaration is missing the v-model directive.')
    return false
  }

  // check buttons def
  const btnValues = buttons.map(btn => btn.data.attrs.value)
  if (includes(btnValues, undefined)) {
    warn(`Some of the ButtonGroupRadio buttons declaration is missing the 'value' prop.`)
    return false
  }

  return true
}
