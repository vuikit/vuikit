<template>
  <div class="uk-padding">

    <h1>Columns Alignment</h1>

    <vk-table
      :data="data"
    >
      <vk-table-column head="Left" cell="name"/>
      <vk-table-column head="Center" cell="name" align="center"/>
      <vk-table-column head="Right" cell="name" align="right"/>
    </vk-table>

    <h2>Middle</h2>

    <vk-table
      :data="[{}]"
    >
      <vk-table-column width="small" head="Middle" align-vertical="middle">
        <div>TABLE DATA</div>
      </vk-table-column>
      <vk-table-column head="TABLE HEAD">
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </vk-table-column>
      <vk-table-column head="TABLE HEAD">
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
