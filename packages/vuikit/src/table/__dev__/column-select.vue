<template>
  <div class="uk-padding">

    <h1>Column Select</h1>

    <vk-table
      rows-selectable
      :data="data"
      :selected-rows.sync="selection"
    >
      <vk-table-column-select/>
      <vk-table-column head="Name" cell="name"/>
    </vk-table>

  </div>
</template>

<script>
import data from './data.json'

export default {
  data: () => ({
    data,
    selection: []
  })
}
</script>
