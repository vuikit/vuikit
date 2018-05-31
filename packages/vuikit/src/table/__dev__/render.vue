<template>
  <div class="uk-padding">

    <h1>Render</h1>
    <TableRender :data="data" :columns="columns"/>

    <h2>Striped</h2>
    <TableRender :data="data" :columns="columns" striped/>

    <h2>Hoverable</h2>
    <TableRender :data="data" :columns="columns" hoverable/>

    <h2>Narrowed</h2>
    <TableRender :data="data" :columns="columns" narrowed/>

    <h2>Divided</h2>
    <TableRender :data="data" :columns="columns" divided/>

  </div>
</template>

<script>
import TableRender from '../render'
import data from './data.json'

export default {
  components: {
    TableRender
  },
  data: () => ({
    data,
    columns: [
      {
        headRender (h) {
          return h('th', 'Head')
        },
        cellRender (h) {
          return h('td', 'Cell')
        },
        context: {}
      },
      {
        headRender (h) {
          return h('th', 'Head 2')
        },
        cellRender (h) {
          return h('td', 'Cell 2')
        },
        context: {}
      }
    ]
  })
}
</script>
