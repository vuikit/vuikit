<template>
  <layouts-default>
    <h1>Table</h1>
    Display a table with autofilled data.
    <div class="uk-block">
      <h2>Basic Usage</h2>
      <hr class="uk-article-divider">
      <TableBasic></TableBasic>
    </div>
    <div class="uk-block">
      <h2>Select</h2>
      <hr class="uk-article-divider">
      <TableSelect></TableSelect>
    </div>
    <div class="uk-block">
      <h2>Sort</h2>
      <hr class="uk-article-divider">
      <TableSort></TableSort>
    </div>
    <div class="uk-block">
      <h2>Scoped Slots</h2>
      <hr class="uk-article-divider">
      <TableScopedSlots></TableScopedSlots>
    </div>
  </layouts-default>
</template>

<script>
import TableBasic from './Basic'
import TableSelect from './Select'
import TableSort from './Sort'
import TableScopedSlots from './ScopedSlots'

export default {
  name: 'PageTable',
  components: {
    TableBasic,
    TableSelect,
    TableSort,
    TableScopedSlots
  }
}
</script>
