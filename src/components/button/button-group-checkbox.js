import { warn } from '~/helpers/debug'
import { includes, toArray } from '@vuikit/util'
import filterNodes from '~/helpers/node/filter'

export default {
  functional: true,
  render (h, { data, props, children, listeners }) {
    const buttons = filterNodes(children)

    if (!validate(data, buttons)) {
      return
    }

    const groupValue = toArray(data.model.value)

    buttons.forEach(btn => {
      const index = buttons.indexOf(btn)
      const value = btn.data.attrs.value
      const isActive = includes(groupValue, value)

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

    return <div class="uk-button-group">{ children }</div>
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
  if (includes(btnValues, undefined)) {
    warn(`Some of the ButtonGroupCheckbox buttons declaration is missing the 'value' prop.`)
    return false
  }

  return true
}
