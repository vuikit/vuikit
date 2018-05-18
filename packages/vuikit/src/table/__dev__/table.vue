<template>
  <div class="uk-padding">

    <h1>Table</h1>

    <vk-table :data="data">
      <vk-table-column head="name" cell="name"/>
      <vk-table-column head="Website" :cell="row => row.website"/>
    </vk-table>

    <h2>Selectable</h2>

    <vk-table
      row-selectable
      :data="data"
      :selected-rows.sync="selection"
    >
      <vk-table-column head="Name" cell="name"/>
    </vk-table>

    <h2>Headless</h2>

    <vk-table :data="data" headless>
      <vk-table-column-select />
      <vk-table-column cell="name" width="expanded" head="Name"/>
    </vk-table>

    <h2>Dynamic Columns</h2>

    <vk-table :data="data">
      <vk-table-column
        v-for="col in columns"
        :key="col"
        :cell="col"
        :head="col"
      ></vk-table-column>
    </vk-table>

    <vk-button @click="columns = ['website', 'name']">Change Order</vk-button>
    <vk-button @click="columns = ['name', 'website']">Reset</vk-button>

    <h2>Responsive</h2>

    <div class="uk-overflow-auto">
      <vk-table :data="[{}, {}, {}]">
        <vk-table-column head="Table Heading">
          <span>Table Heading</span>
        </vk-table-column>
        <vk-table-column head="Table Heading">
          <span>Table Heading</span>
        </vk-table-column>
        <vk-table-column head="Table Heading">
          <span>Table Heading</span>
        </vk-table-column>
        <vk-table-column head="Table Heading">
          <span>Table Heading</span>
        </vk-table-column>
        <vk-table-column head="Table Heading">
          <span>Table Heading</span>
        </vk-table-column>
        <vk-table-column head="Table Heading">
          <span>Table Heading</span>
        </vk-table-column>
        <vk-table-column head="Table Heading">
          <span>Table Heading</span>
        </vk-table-column>
        <vk-table-column head="Table Heading">
          <span>Table Heading</span>
        </vk-table-column>
        <vk-table-column head="Table Heading">
          <span>Table Heading</span>
        </vk-table-column>
        <vk-table-column head="Table Heading">
          <span>Table Heading</span>
        </vk-table-column>
        <vk-table-column head="Table Heading">
          <span>Table Heading</span>
        </vk-table-column>
      </vk-table>
    </div>

  </div>
</template>

<script>
import data from './data.json'

export default {
  data: () => ({
    data,
    selection: [],
    columns: ['name', 'website']
  })
}
</script>
