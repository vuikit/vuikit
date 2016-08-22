import { each } from '../helpers/util'

export default {
  name: 'VkButtonRadio',
  props: {
    value: {},
    group: {
      type: Boolean,
      default: true
    }
  },
  render (h) {
    // override button props
    each(this.$slots.default, node => {
      if (node.componentOptions) {
        const button = node.componentOptions.propsData
        button.ariaType = 'checked'
        button.active = button.value === this.value
      }
    })
    return (
      <div class={{
        'uk-button-group': this.group
      }}>{
        this.$slots.default
      }</div>
    )
  },
  mounted () {
    each(this.$children, button => {
      button.$el.addEventListener('click', () => this.$emit('change', button.value))
    })
  }
}
