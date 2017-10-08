import { warn } from '~/helpers/debug'
import { inArray } from '@vuikit/util'
import UiButtonGroup from '~/ui/button/button-group' // eslint-disable-line
import { filterOutEmptyNodes } from '~/helpers/component'

export default {
  functional: true,
  render (h, { data, props, children, listeners }) {
    const buttons = filterOutEmptyNodes(children)

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

    return <UiButtonGroup>{ children }</UiButtonGroup>
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
  if (inArray(btnValues, undefined)) {
    warn(`Some of the ButtonGroupRadio buttons declaration is missing the 'value' prop.`)
    return false
  }

  return true
}
