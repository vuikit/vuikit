<template>
  <div class="uk-padding">

    <h1>Table</h1>

    <vk-table divided :data="data">
      <vk-table-column title="Company" cell="company" expanded />
      <vk-table-column title="Website" cell="website" shrinked />
    </vk-table>

    <h2>Headless</h2>

    <vk-table divided :data="data">
      <vk-table-column cell="company" expanded />
      <vk-table-column cell="website" shrinked />
    </vk-table>

    <h2>Customizations</h2>

    <vk-table
      divided
      middle-aligned
      :data="data"
    >
      <vk-table-column
        title="Custom Class"
        cell="website"
        class="uk-text-right"
        cellClass="uk-text-right"
      ></vk-table-column>
      <vk-table-column
        title="Cell Slot"
        cell="website"
      >
        <div
          slot="cell"
          slot-scope="val"
          class="uk-text-right"
        >
          <a :href="`http://${ val }`">{{ val }}</a>
        </div>
      </vk-table-column>
      <vk-table-column
        title="Empty Cell Slot"
        cell="none"
      >
        <div
          slot="emptyCell"
          slot-scope="row"
        >
          Is Empty
        </div>
      </vk-table-column>
    </vk-table>

    <h2>Dynamic Columns</h2>

    <vk-table divided :data="data">
      <vk-table-column
        v-for="col in columns"
        :key="col"
        :cell="col"
        :title="col"
      ></vk-table-column>
    </vk-table>

    <vk-button @click="columns = ['website', 'company']">Change Order</vk-button>
    <vk-button @click="columns = ['company', 'website']">Reset</vk-button>

    <h2>Modifiers</h2>

    <vk-table
      divided
      striped
      hoverable
      narrowed
      middle-aligned
      :data="data"
    >
      <vk-table-column
        title="Website"
        cell="website"
      ></vk-table-column>
    </vk-table>
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
