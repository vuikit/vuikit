import { warn } from '~/helpers/debug'
import { inArray } from '~/helpers/util'
import UiButtonGroup from '~/ui/button/button-group' // eslint-disable-line
import { filterOutEmptyNodes } from '~/helpers/component'

export default {
  functional: true,
  render (h, { data, props, children, listeners }) {
    const buttons = filterOutEmptyNodes(children)

    if (!validate(data, buttons)) {
      return
    }

    const groupValue = [...data.model.value]

    buttons.forEach(btn => {
      const index = buttons.indexOf(btn)
      const value = btn.data.attrs.value
      const isActive = inArray(groupValue, value)

      if (isActive) {
        btn.data.class.push('uk-active')
      }

      // on click toggle value
      btn.data.on = {
        click: () => {
          if (isActive) {
            groupValue.splice(index, 1)
          } else {
            groupValue.splice(index, 0, value)
          }

          listeners.input(groupValue)
        }
      }
    })

    return <UiButtonGroup>{ children }</UiButtonGroup>
  }
}

function validate (data, buttons) {
  // check group def
  if (!data.model) {
    warn('ButtonGroupCheckbox declaration is missing the v-model directive.')
    return false
  }

  // check buttons def
  const btnValues = buttons.map(btn => btn.data.attrs.value)
  if (inArray(btnValues, undefined)) {
    warn(`Some of the ButtonGroupCheckbox buttons declaration is missing the 'value' prop.`)
    return false
  }

  return true
}
