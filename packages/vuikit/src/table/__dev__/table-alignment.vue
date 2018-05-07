<template>
  <div class="uk-padding">

    <h1>Columns Alignment</h1>

    <vk-table
      :data="data"
    >
      <vk-table-column title="Left" cell="name"/>
      <vk-table-column title="Center" cell="name" align="center"/>
      <vk-table-column title="Right" cell="name" align="right"/>
    </vk-table>

    <h2>Middle</h2>

    <vk-table
      :data="[{}]"
    >
      <vk-table-column size="small" title="Middle" align="middle">
        <div>TABLE DATA</div>
      </vk-table-column>
      <vk-table-column title="TABLE HEAD">
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </vk-table-column>
      <vk-table-column title="TABLE HEAD">
        <vk-button size="small">BUTTON</vk-button>
      </vk-table-column>
    </vk-table>


    <vk-table
      :data="[{}]"
      middle-aligned
    >
      <vk-table-column size="small" title="Middle">
        <div>TABLE DATA</div>
      </vk-table-column>
      <vk-table-column title="Middle">
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </vk-table-column>
      <vk-table-column title="Middle">
        <vk-button size="small">BUTTON</vk-button>
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
