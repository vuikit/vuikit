<template>
  <div class="uk-padding">

    <h1>Table</h1>

    <vk-table :data="data">
      <vk-table-column head="Id" cell="id" width="shrinked"/>
      <vk-table-column head="Name" cell="name"/>
    </vk-table>

    <h1>Row Active fn</h1>

    <vk-table :data="data" :fnRowActive="row => true">
      <vk-table-column head="Id" cell="id" width="shrinked"/>
      <vk-table-column head="Name" cell="name"/>
    </vk-table>

    <h1>Row Class</h1>

    <vk-table :data="data" :fnRowClass="row => 'uk-text-warning'">
      <vk-table-column head="Id" cell="id" width="shrinked"/>
      <vk-table-column head="Name" cell="name"/>
    </vk-table>

    <h2>Headless</h2>

    <vk-table :data="data" headless>
      <vk-table-column cell="name" width="expanded" head="Name"/>
    </vk-table>

    <h2>Slots</h2>

    <vk-table :data="data">
      <vk-table-column head="Slot">
        <div>Static</div>
      </vk-table-column>
      <vk-table-column head="Slot with Scope" cell="website">
        <div slot-scope="{ value, row }">
          {{ row.name }},
          <a :href="`http://${ value }`">{{ value }}</a>
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

    <h2>Columns Alignment</h2>

    <vk-table :data="data">
      <vk-table-column head="Left" cell="name"/>
      <vk-table-column head="Center" cell="name" align="center"/>
      <vk-table-column head="Right" cell="name" align="right"/>
    </vk-table>

    <h2>Middle</h2>

    <vk-table :data="[{}]">
      <vk-table-column width="small" head="Middle" align-vertical="middle">
        <div>TABLE DATA</div>
      </vk-table-column>
      <vk-table-column head="TABLE HEAD">
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </vk-table-column>
      <vk-table-column head="TABLE HEAD" align-vertical="middle">
        <vk-button width="small">BUTTON</vk-button>
      </vk-table-column>
    </vk-table>

    <vk-table
      :data="[{}]"
      middle-aligned
    >
      <vk-table-column width="small" head="Middle">
        <div>TABLE DATA</div>
      </vk-table-column>
      <vk-table-column head="Middle">
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </vk-table-column>
      <vk-table-column head="Middle">
        <vk-button width="small">BUTTON</vk-button>
      </vk-table-column>
    </vk-table>

    <h2>Columns Size</h2>

    <vk-table :data="data">
      <vk-table-column head="Shrinked" cell="name" width="shrinked"/>
      <vk-table-column head="Expanded" cell="name" width="expanded"/>
      <vk-table-column head="Shrinked" cell="name" width="shrinked"/>
    </vk-table>

    <vk-table :data="data">
      <vk-table-column head="Small" cell="name" width="small"/>
      <vk-table-column head="Medium" cell="name" width="medium"/>
      <vk-table-column head="Large" cell="name" width="large"/>
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
import data from './_data.json'

export default {
  data: () => ({
    data,
    selection: [],
    selectionSingle: [],
    columns: ['name', 'website']
  })
}
</script>
