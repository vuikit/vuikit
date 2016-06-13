<template>
  <div>
    <tabs-default></tabs-default>
    <h2 class="tm-docs-subtitle">Vertical</h2>
    <hr class="uk-article-divider">
    <tabs-vertical></tabs-vertical>
  </div>
</template>

<script>
import TabsDefault from './TabsDefault'
import TabsVertical from './TabsVertical'

export default {
  components: {
    TabsDefault,
    TabsVertical
  }
}
</script>
