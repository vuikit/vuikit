<template>
  <ul class="uk-tab"
    :data-uk-tab="{ connect: '#' + connect } | json">
    <li v-for="item in items"
      :class="[classes, {
        'uk-disabled': item.disabled
      }]">
      <a href="" v-text="item.title"></a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      defaul: () => []
    },
    connect: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    }
  },
  computed: {
    classes: function (item) {
      const classes = {}
      classes['uk-width-' + this.width] = this.width
      return classes
    }
  }
}
</script>
