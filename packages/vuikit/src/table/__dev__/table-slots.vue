<template>
  <div class="uk-padding">

    <h1>Slots</h1>

    <vk-table
      :data="data"
    >
      <vk-table-column head="Slot">
        <div>Static</div>
      </vk-table-column>
      <vk-table-column head="Slot with Scope" cell="website">
        <div slot-scope="{ cell, row }">
          {{ row.name }},
          <a :href="`http://${ cell }`">{{ cell }}</a>
        </div>
      </vk-table-column>
      <vk-table-column head="Empty Slot" cell="_">
        <div>
          Is NOT empty
        </div>
        <div slot="empty">
          Is empty
        </div>
      </vk-table-column>
      <vk-table-column head="Empty Slot with Scope" cell="_">
        <div slot="empty" slot-scope="{ row }">
          {{ row.name }} cell is Empty
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
