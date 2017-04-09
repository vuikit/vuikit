<template>
  <select class="uk-select uk-form-width-small"
    style="margin: 20px 20px 20px 0px;"
    v-model="component"
    @change="$router.push(component)">
    <option v-for="option in components" :value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>

<script>
export default {
  data: () => ({
    component: ''
  }),
  computed: {
    components () {
      return this.$router.options.routes.filter(route => route.component).map(c => ({
        text: c.name, value: c.path
      }))
    }
  },
  mounted () {
    this.component = this.$route.path
  }
}
</script>
