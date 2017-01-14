<template>
  <layouts-default>
    <h1>Datepicker</h1>
    Display a calendar table with pickable dates.
    <div class="uk-block">
      <h2>Basic Usage</h2>
      <hr class="uk-article-divider">
      <Basic></Basic>
    </div>
    <div class="uk-block">
      <h2>Datepicker & Input</h2>
      <hr class="uk-article-divider">
      You may be expecting an out of a box Datepicker combination with an input.
      That approach assumes too much about your project requirements, instead we
      encourage you to make your own wrapper component following
      <router-link to="example-datepicker-dropdown">this</router-link> example.
    </div>
  </layouts-default>
</template>

<script>
import Basic from './Basic'

export default {
  name: 'PageDatepicker',
  components: {
    Basic
  }
}
</script>
