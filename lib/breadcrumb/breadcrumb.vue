<template>
  <ul class="uk-breadcrumb">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'VkBreadcrumb',
  props: {
    location: {
      type: String,
      default: '/'
    }
  },
  computed: {
    items: {
      get () {
        return this.$slots.default.filter(c =>
          c.componentOptions && c.componentOptions.tag === 'vk-breadcrumb-item'
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
      this.items.forEach(item => {
        const props = item.componentOptions.propsData
        props.active = this.location === props.path
      })
    }
  }
}
</script>
