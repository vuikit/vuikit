<template>
  <layouts-default>
    <tabs-default></tabs-default>
    <tabs-vertical></tabs-vertical>
  </layouts-default>
</template>

<script>
import TabsDefault from './Tabs'
import TabsVertical from './TabsVertical'

export default {
  name: 'PageTabs',
  components: {
    TabsDefault,
    TabsVertical
  }
}
</script>
