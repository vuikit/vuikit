<template>
  <div>
    <div class="uk-margin-large">
      Columns layout can be customized setting <code>header</code> and <code>cell</code>
      <a href="https://vuejs.org/v2/guide/components.html#Scoped-Slots">Scoped Slots</a>
      in the column declaration.
    </div>
    <!-- TABS -->
    <vk-tabs
      :activeTab="activeTab"
      @change="index => activeTab = index">
      <vk-tab label="Demo">
        <vk-table condensed :data="data">
          <vk-table-column header="Name" cell="name" />
          <vk-table-column header="Hits" cell="hits" />
          <vk-table-column>
            <template slot="header" scope="props">
              <vk-button
                size="mini"
                color="danger"
                @click="resetHits">
                Reset All
              </vk-button>
            </template>
            <template slot="cell" scope="props">
              <vk-button
                size="mini"
                color="danger"
                @click="data[props.rowIndex].hits = 0">
                Reset Hits
              </vk-button>
            </template>
          </vk-table-column>
        </vk-table>
      </vk-tab>
      <vk-tab label="Code">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import mixin from '../_mixin'

export default {
  mixins: [mixin],
  data: () => ({
    activeTab: 1,
    data: [
      { name: 'Item A', hits: 100, desc: 'Description' },
      { name: 'Item B', hits: 40, desc: 'Description' },
      { name: 'Item C', hits: 700, desc: 'Description' }
    ],
    example
  }),
  methods: {
    resetHits () {
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].hits = 0
      }
    }
  }
}

/* eslint-disable */
const example = `<template>
  <vk-table :data="data">
    <vk-table-column header="Name" cell="name" />
    <vk-table-column header="Hits" cell="hits" />
    <vk-table-column>
      <template slot="header" scope="props">
        <vk-button
          size="mini"
          color="danger"
          @click="resetHits">
          Reset All
        </vk-button>
      </template>
      <template slot="cell" scope="props">
        <vk-button
          size="mini"
          color="danger"
          @click="data[props.rowIndex].hits = 0">
          Reset Hits
        </vk-button>
      </template>
    </vk-table-column>
  </vk-table>
<\/template>

<script>
export default {
  data: () => ({
    data: [
      { name: 'Item A', hits: 100, desc: 'Description' },
      { name: 'Item B', hits: 40, desc: 'Description' },
      { name: 'Item C', hits: 700, desc: 'Description' }
    ]
  }),
  methods: {
    resetHits () {
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].hits = 0
      }
    }
  }
}
<\/script>`
</script>
