<template>
  <ul class="uk-subnav"
    :class="{
      'uk-subnav-line': line,
      'uk-subnav-pill': pill
    }">
    <li v-for="(item, slug) in items"
      :class="{
        'uk-active': slug === active,
        'uk-disabled': item.disabled
      }">
      <a @click.prevent="select(slug)">
        {{ item.name }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'VkSubnav',
  props: {
    items: {
      type: Object,
      required: true
    },
    active: {
      type: String,
      default: ''
    },
    line: {
      type: Boolean,
      default: false
    },
    pill: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    select (selected) {
      const item = this.items[selected]
      if (!item.disabled && selected !== this.active) {
        this.$emit('change', selected)
      }
    }
  }
}
</script>
