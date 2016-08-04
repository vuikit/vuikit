<template>
  <vk-docs-layout-page>
    <tabs-default></tabs-default>
    <!-- <tabs-vertical></tabs-vertical> -->
  </vk-docs-layout-page>
</template>

<script>
import TabsDefault from './Default'
import TabsVertical from './Vertical'

export default {
  name: 'PageTabs',
  components: {
    TabsDefault,
    TabsVertical
  }
}
</script>
