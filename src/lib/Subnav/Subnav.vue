<template>
  <ul class="uk-subnav" :class="{
    'uk-subnav-line': line,
    'uk-subnav-pill': pill
  }">
    <slot />
  </ul>
</template>

<script>
export default {
  name: 'VkSubnav',
  props: {
    activeItem: [String, Number],
    line: {
      type: Boolean,
      default: false
    },
    pill: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    items: {
      get () {
        return this.$slots.default.filter(c =>
          c.componentOptions && c.componentOptions.tag === 'vk-subnav-item'
        )
      },
      cache: false
    }
  },
  beforeMount () {
    this.updateItems()
  },
  beforeUpdate () {
    this.updateItems()
  },
  methods: {
    updateItems () {
      this.items.forEach((item, index) => {
        const alias = this.getItemAlias(item)
        const active = this.activeItem === alias
        const props = item.componentOptions.propsData
        props.active = active
        props.alias = alias
      })
    },
    getItemAlias (item) {
      return item.componentOptions.propsData.alias || this.items.indexOf(item) + 1
    }
  }
}
</script>
