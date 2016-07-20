<template>
  <vk-docs-layout-page>
    <tabs-default></tabs-default>
    <!-- <tabs-vertical></tabs-vertical> -->
  </vk-docs-layout-page>
</template>

<script>
import TabsDefault from './TabsDefault'
import TabsVertical from './TabsVertical'

export default {
  name: 'pageTabs',
  components: {
    TabsDefault,
    TabsVertical
  }
}
</script>
