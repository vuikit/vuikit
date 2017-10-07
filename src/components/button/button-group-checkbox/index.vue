<script>
import { inArray } from '~/helpers/util'
import { filterOutEmptyNodes } from '~/helpers/component'

export default {
  name: 'ButtonGroupCheckbox',
  functional: true,
  props: {
    spaced: {
      type: Boolean,
      default: false
    }
  },
  render (h, { data, props, children, listeners }) {
    const renderData = {
      class: {
        'uk-button-group': !props.spaced
      }
    }

    const value = [...data.model.value]
    const buttons = filterOutEmptyNodes(children)

    buttons.forEach(btnNode => {
      const btnValue = btnNode.data.value
      const isActive = inArray(value, btnValue)

      btnNode.data.class['uk-active'] = isActive
      btnNode.data.on.click = () => {
        // toggle value
        if (isActive) {
          const index = value.findIndex(v => v === btnValue)
          value.splice(index, 1)
        } else {
          const index = buttons.findIndex(v => v === btnNode)
          value.splice(index, 0, btnValue)
        }

        listeners.input(value)
      }
    })

    return <div { ...renderData }>{ children }</div>
  }
}
</script>
