<template>
  <div class="uk-padding">

    <h1>Table</h1>

    <vk-table :data="data">
      <vk-table-column title="Company" cell="company" expanded />
      <vk-table-column title="Website" cell="website" shrinked />
    </vk-table>

    <h2>Headless</h2>

    <vk-table :data="data">
      <vk-table-column-select headless />
      <vk-table-column cell="company" expanded />
      <vk-table-column cell="website" shrinked />
    </vk-table>

    <h2>Custom classes</h2>

    <vk-table :data="data" :sortedBy="{}">
      <vk-table-column-select
        class="custom-class"
        cellClass="custom-class"
      ></vk-table-column-select>
      <vk-table-column
        title="Custom Class"
        cell="website"
        class="uk-text-right"
        cellClass="uk-text-right"
      ></vk-table-column>
      <vk-table-column-sort
        title="Custom Class"
        cell="website"
        class="uk-text-center"
        cellClass="uk-text-center"
      ></vk-table-column-sort>
    </vk-table>

    <h2>Dynamic Columns</h2>

    <vk-table :data="data">
      <vk-table-column
        v-for="col in columns"
        :key="col"
        :cell="col"
        :title="col"
      ></vk-table-column>
    </vk-table>

    <vk-button @click="columns = ['website', 'company']">Change Order</vk-button>
    <vk-button @click="columns = ['company', 'website']">Reset</vk-button>

  </div>
</template>

<script>
import data from './data.json'

export default {
  data: () => ({
    columns: ['company', 'website'],
    data
  })
}
</script>
