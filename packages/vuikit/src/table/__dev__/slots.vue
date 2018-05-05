<template>
  <div class="uk-padding">

    <h1>Slots</h1>

    <vk-table :data="data">
      <vk-table-column title="Default Slot">
        <div>Static</div>
      </vk-table-column>
      <vk-table-column title="Default Slot with scope" cell="website">
        <div slot-scope="{ cell, row }">
          {{ row.company }},
          <a :href="`http://${ cell }`">{{ cell }}</a>
        </div>
      </vk-table-column>
      <vk-table-column title="Empty Slot" cell="_">
        <div>
          The cell is not empty
        </div>
        <div slot="empty">
          This cell is empty
        </div>
      </vk-table-column>
      <vk-table-column title="Empty Slot with scope" cell="_">
        <div slot="empty" slot-scope="{ row }">
          This cell from {{ row.company }} is Empty
        </div>
      </vk-table-column>
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
