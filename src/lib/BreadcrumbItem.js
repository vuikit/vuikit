export default {
  name: 'VkBreadcrumbItem',
  props: {
    path: {
      type: String,
      default: '/'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    active () {
      return this.path === this.$parent.location
    }
  },
  render (h) {
    const name = this.$slots.default
    let content
    if (!this.disabled && !this.active) {
      content = (
        <a on-click={event => {
          event.preventDefault()
          this.$parent.$emit('change', this.path)
        }}>
          { name }
        </a>
      )
    } else {
      content = (<span>{ name }</span>)
    }
    return (
      <li class={{
        'uk-active': this.active
      }}>
        { content }
      </li>
    )
  }
}
