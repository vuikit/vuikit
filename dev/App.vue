<template>
  <div class="uk-container uk-margin-bottom">
    <select class="uk-select uk-form-width-small"
      style="margin: 20px 20px 20px 0px;"
      v-model="component"
      @change="$router.push(component)">
      <option v-for="option in components" :value="option.value">
        {{ option.text }}
      </option>
    </select>
    <h1>{{ $route.name }}</h1>
    <router-view></router-view>
  </div>
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
