<template>
  <div>
    <tab-horizontal></tab-horizontal>
    <h2 class="tm-docs-subtitle">Vertical</h2>
    <hr class="uk-article-divider">
    <tab-vertical></tab-vertical>
  </div>
</template>

<script>
import TabHorizontal from './TabHorizontal'
import TabVertical from './TabVertical'

export default {
  components: {
    TabHorizontal,
    TabVertical
  }
}
</script>
