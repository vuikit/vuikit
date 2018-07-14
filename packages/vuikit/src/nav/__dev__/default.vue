<template>
  <div class="uk-padding">

    <h1>Nav</h1>

    <nav-demo />

    <h2>Styles</h2>

    <vk-grid class="uk-margin-large uk-child-width-1-2@s uk-child-width-1-3@m">
      <div>
        <h3>Primary</h3>
        <nav-demo type="primary" />
      </div>

      <div>
        <h3>Blank</h3>
        <nav-demo type="blank" />
      </div>

      <div>
        <h3>Center</h3>
        <nav-demo center />
      </div>
    </vk-grid>

  </div>
</template>

<script>
import NavDemo from './_nav.vue'

export default {
  components: {
    NavDemo
  }
}
</script>
