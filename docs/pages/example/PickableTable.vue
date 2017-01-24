<template>
  <layouts-default>
    <h1>Pickable Table</h1>
    This example illustrate how to make <code>vk-table</code> data pickable.
    <hr class="uk-article-divider">
    <div class="uk-margin">
      <div class="uk-form">
        <vk-table :data="data" condensed>
          <vk-table-column header="Name">
            <template slot="cell" scope="props">
              <a @click.prevent="picked = props.row.name">
                {{ props.row.name }}
              </a>
            </template>
          </vk-table-column>
          <vk-table-column header="Hits">
            <template slot="cell" scope="props">
              <a @click.prevent="picked = props.row.hits">
                {{ props.row.hits }}
              </a>
            </template>
          </vk-table-column>
          <vk-table-column header="Description" cell="desc" />
        </vk-table>
      </div>
      <div class="uk-margin" v-show="picked">
        {{ 'Picked ' + picked }}
      </div>
    </div>
    <vk-docs-code>{{ code }}</vk-docs-code>
  </layouts-default>
</template>

<script>
import mixin from '../_mixin'

export default {
  mixins: [mixin],
  data: () => ({
    picked: '',
    data: [
      { name: 'Item A', hits: 100, desc: 'Description' },
      { name: 'Item B', hits: 40, desc: 'Description' },
      { name: 'Item C', hits: 700, desc: 'Description' }
    ],
    example
  })
}

const example =
`<vk-table :data="data">
  <vk-table-column header="Name">
    <template slot="cell" scope="props">
      <a @click.prevent="picked = props.row.name">
        {{ props.row.name }}
      </a>
    </template>
  </vk-table-column>
  <vk-table-column header="Hits">
    <template slot="cell" scope="props">
      <a @click.prevent="picked = props.row.hits">
        {{ props.row.hits }}
      </a>
    </template>
  </vk-table-column>
  <vk-table-column header="Description" cell="desc" />
</vk-table>`
</script>
