<template>
  <div class="uk-padding">

    <h1>Nav</h1>

    <vk-grid class="uk-child-width-1-4@m">
      <div>
        <h2>Default</h2>
        <nav-demo />
      </div>

      <div>
        <h2>Primary</h2>
        <nav-demo type="primary" />
      </div>

      <div>
        <h2>No style</h2>
        <nav-demo :type="false" />
      </div>

      <div>
        <h2>Center</h2>
        <nav-demo center />
      </div>
    </vk-grid>

  </div>
</template>

<script>
import NavDemo from './_nav'

export default {
  components: {
    NavDemo
  }
}
</script>
