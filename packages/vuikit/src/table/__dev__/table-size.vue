<template>
  <div class="uk-padding">

    <h1>Sizes</h1>

    <h2>Narrowed</h2>

    <vk-table
      narrowed
      :data="data"
    >
      <vk-table-column title="Name" cell="name"/>
    </vk-table>

    <h2>Enlarged</h2>

    <vk-table
      enlarged
      :data="data"
    >
      <vk-table-column title="Name" cell="name"/>
    </vk-table>

    <h2>Columns Size</h2>

    <vk-table :data="data">
      <vk-table-column title="Shrinked" cell="name" size="shrinked"/>
      <vk-table-column title="Expanded" cell="name" size="expanded"/>
      <vk-table-column title="Shrinked" cell="name" size="shrinked"/>
    </vk-table>

    <vk-table :data="data">
      <vk-table-column title="Small" cell="name" size="small"/>
      <vk-table-column title="Medium" cell="name" size="medium"/>
      <vk-table-column title="Large" cell="name" size="large"/>
      <vk-table-column-text title="Text" cell="name"/>
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
