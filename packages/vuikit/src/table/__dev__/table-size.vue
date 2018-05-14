<template>
  <div class="uk-padding">

    <h1>Sizes</h1>

    <h2>Narrowed</h2>

    <vk-table
      narrowed
      :data="data"
    >
      <vk-table-column head="Name" cell="name"/>
    </vk-table>

    <h2>Enlarged</h2>

    <vk-table
      enlarged
      :data="data"
    >
      <vk-table-column head="Name" cell="name"/>
    </vk-table>

    <h2>Columns Size</h2>

    <vk-table :data="data">
      <vk-table-column head="Shrinked" cell="name" size="shrinked"/>
      <vk-table-column head="Expanded" cell="name" size="expanded"/>
      <vk-table-column head="Shrinked" cell="name" size="shrinked"/>
    </vk-table>

    <vk-table :data="data">
      <vk-table-column head="Small" cell="name" size="small"/>
      <vk-table-column head="Medium" cell="name" size="medium"/>
      <vk-table-column head="Large" cell="name" size="large"/>
      <vk-table-column-text head="Text" cell="name"/>
    </vk-table>

  </div>
</template>

<script>
import data from './data.json'

export default {
  data: () => ({
    data
  })
}
</script>
