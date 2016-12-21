<script>
import { each, inArray } from '../helpers/util'

export default {
  name: 'VkButtonCheckbox',
  props: {
    value: {
      type: Array,
      default: () => []
    },
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
        button.active = inArray(this.value, button.value)
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
      button.$on('click', () => this.toggle(button))
    })
  },
  methods: {
    toggle (selected) {
      // recreate new value respecting buttons order
      const value = this.$children
        .filter(button => button === selected
          ? !button.active
          : button.active)
        .map(button => button.value)
      this.$emit('change', value)
    }
  }
}
</script>
