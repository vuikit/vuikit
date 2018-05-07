<template>
  <div class="uk-padding">

    <h1>Modifiers</h1>

    <h2>Striped, Hoverable, Narrowed</h2>

    <vk-table
      striped
      hoverable
      narrowed
      :data="data"
    >
      <vk-table-column title="Name" cell="name"/>
    </vk-table>

    <h2>Divided disabled</h2>

    <vk-table
      :data="data"
      :divided="false"
    >
      <vk-table-column cell="name" />
    </vk-table>

    <h2>Justified</h2>

    <vk-table
      :data="[{}, {}]"
      justified
    >
      <vk-table-column class="uk-width-small" title="TABLE HEAD">
        <div>TABLE DATA</div>
      </vk-table-column>
      <vk-table-column title="TABLE HEAD">
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </vk-table-column>
      <vk-table-column title="TABLE HEAD">
        <vk-button>BUTTON</vk-button>
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
