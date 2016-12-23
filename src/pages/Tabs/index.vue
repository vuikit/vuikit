<template>
  <layouts-default>
    <h1>Tabs</h1>
    Display content collection using tabs.
    <div class="uk-block">
      <h2>Basic</h2>
      <hr class="uk-article-divider">
      <Tabs></Tabs>
    </div>
    <div class="uk-block">
      <h2>Vertical Variation</h2>
      <hr class="uk-article-divider">
      <TabsVertical></TabsVertical>
    </div>
    <div class="uk-block">
      <h2>Scoped Slots</h2>
      <hr class="uk-article-divider">
      <ScopedSlots></ScopedSlots>
    </div>
  </layouts-default>
</template>

<script>
import Tabs from './Tabs'
import TabsVertical from './TabsVertical'
import ScopedSlots from './ScopedSlots'

export default {
  name: 'PageTabs',
  components: {
    Tabs,
    TabsVertical,
    ScopedSlots
  }
}
</script>
