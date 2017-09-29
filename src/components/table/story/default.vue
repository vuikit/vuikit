<template>
  <div class="uk-padding">
    <vk-table middle divider
      :data="rows"
    >
      <vk-table-column
        header="Website"
        cell="website"
      ></vk-table-column>
      <vk-table-column
        header="Website"
        headerClass="uk-text-right"
        cellClass="uk-text-right">
        <template scope="row">
          <a :href="`http://${row.website}`">{{ row.website }}</a>
        </template>
      </vk-table-column>
    </vk-table>
  </div>
</template>

<script>
import mockData from './mock-data.json'

export default {
  data: () => ({
    rows: mockData.splice(0, 5)
  })
}
</script>
