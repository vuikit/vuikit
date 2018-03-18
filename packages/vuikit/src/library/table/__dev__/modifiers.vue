<template>
  <div class="uk-padding">

    <h1>Modifiers</h1>

    <vk-table
      striped
      hoverable
      narrowed
      cells-middle
      :data="data"
    >
      <vk-table-column
        title="Website"
        cell="website"
      ></vk-table-column>
    </vk-table>

    <vk-table :data="data">
      <vk-table-column
        cells-middle
        title="Website"
        cell="website"
      ></vk-table-column>
    </vk-table>

    <h2>Divided disabled</h2>

    <vk-table :data="data" :divided="false">
      <vk-table-column cell="company" expanded />
      <vk-table-column cell="website" shrinked />
    </vk-table>

    <h2>Cell Middle Alignment</h2>

    <vk-table :data="[{}, {}]" cell-middle>
      <vk-table-column class="uk-width-small" title="TABLE HEAD">
        <div slot="empty" slot-scope="row">TABLE DATA</div>
      </vk-table-column>
      <vk-table-column title="TABLE HEAD">
        <div slot="empty" slot-scope="row">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </vk-table-column>
      <vk-table-column title="TABLE HEAD">
        <vk-button slot="empty" slot-scope="row">BUTTON</vk-button>
      </vk-table-column>
    </vk-table>

    <hr />

    <vk-table :data="[{}, {}]">
      <vk-table-column class="uk-width-small" title="TABLE HEAD">
        <div slot="empty" slot-scope="row">TABLE DATA</div>
      </vk-table-column>
      <vk-table-column title="TABLE HEAD">
        <div slot="empty" slot-scope="row">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </vk-table-column>
      <vk-table-column title="TABLE HEAD" cell-middle>
        <vk-button slot="empty" slot-scope="row">BUTTON</vk-button>
      </vk-table-column>
    </vk-table>

    <h2>Justified</h2>

    <vk-table :data="[{}, {}]" justified>
      <vk-table-column class="uk-width-small" title="TABLE HEAD">
        <div slot="empty" slot-scope="row">TABLE DATA</div>
      </vk-table-column>
      <vk-table-column title="TABLE HEAD">
        <div slot="empty" slot-scope="row">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </vk-table-column>
      <vk-table-column title="TABLE HEAD">
        <vk-button slot="empty" slot-scope="row">BUTTON</vk-button>
      </vk-table-column>
    </vk-table>

    <h2>Column Width</h2>

    <vk-table :data="data">
      <vk-table-column title="Shrinked" cell="company" shrinked></vk-table-column>
      <vk-table-column title="Expanded" expanded>
        <div slot="empty" slot-scope="row">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </vk-table-column>
      <vk-table-column title="Width Small" cell="website" width="small"></vk-table-column>
    </vk-table>

    <h2>Responsive</h2>

    <div class="uk-overflow-auto">
      <vk-table :data="[{}, {}, {}]">
        <vk-table-column title="Table Heading">
          <span>Table Heading</span>
        </vk-table-column>
        <vk-table-column title="Table Heading">
          <span>Table Heading</span>
        </vk-table-column>
        <vk-table-column title="Table Heading">
          <span>Table Heading</span>
        </vk-table-column>
        <vk-table-column title="Table Heading">
          <span>Table Heading</span>
        </vk-table-column>
        <vk-table-column title="Table Heading">
          <span>Table Heading</span>
        </vk-table-column>
        <vk-table-column title="Table Heading">
          <span>Table Heading</span>
        </vk-table-column>
        <vk-table-column title="Table Heading">
          <span>Table Heading</span>
        </vk-table-column>
        <vk-table-column title="Table Heading">
          <span>Table Heading</span>
        </vk-table-column>
        <vk-table-column title="Table Heading">
          <span>Table Heading</span>
        </vk-table-column>
        <vk-table-column title="Table Heading">
          <span>Table Heading</span>
        </vk-table-column>
        <vk-table-column title="Table Heading">
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
    columns: ['company', 'website'],
    data
  })
}
</script>
