<script>
import { filterOutEmptyNodes } from '~/helpers/component'

export default {
  name: 'VkButtonGroupRadio',
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

    const radioValue = data.model.value
    const buttons = filterOutEmptyNodes(children)

    buttons.forEach(node => {
      const btnValue = node.data.value

      node.data.class['uk-active'] = btnValue === radioValue
      node.data.on.click = () => listeners.input(btnValue)
    })

    return <div { ...renderData }>{ children }</div>
  }
}
</script>
