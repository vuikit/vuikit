<template>
  <table class="uk-table">
    <thead>
      <tr>
        <slot></slot>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in data"
        :class="getRowClass(row)"
        @click="e => emitClickRow(e, row)">
        <cell v-for="col in columns"
          :key="col._uid"
          :col="col"
          :row="row">
        </cell>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { isFunction } from 'src/js/util/index'

const Cell = {
  functional: true,
  props: ['row', 'col'],
  render (h, { data, props }) {
    const { col, row } = props
    const cellRender = col.$vnode.componentOptions.Ctor.options.cellRender

    if (cellRender) {
      return cellRender.call(col, h, row)
    } else {
      // warn
    }
  }
}

export default {
  name: 'VkTable',
  components: { Cell },
  props: {
    data: {
      type: Array,
      required: true
    },
    rowClass: [String, Function],
    // column-sort related
    sortedBy: {
      type: Object,
      default: () => ({}) // { field: [asc|desc] }
    },
    // column-select related
    selection: Array
  },
  data: () => ({
    children: []
  }),
  computed: {
    columns: {
      get () {
        if (!this.$slots.default) {
          return []
        }
        return this.children
          .filter(child => child.$el.nodeName === 'TH')
          .sort((a, b) => {
            const findByProps = comp => slot =>
              JSON.stringify(slot.componentOptions.propsData) === JSON.stringify(comp.$options.propsData)
            const slots = this.$slots.default.filter(s => s.tag)
            const indexA = slots.findIndex(findByProps(a))
            const indexB = slots.findIndex(findByProps(b))

            if (indexA === indexB) return 0
            return (indexA > indexB) ? 1 : -1
          })
      },
      cache: false
    }
  },
  mounted () {
    // workaround for reactivity
    this.children = this.$children
  },
  methods: {
    getRowClass (row, index) {
      return (isFunction(this.rowClass))
        ? this.rowClass(row, index)
        : this.rowClass
    },
    emitClickRow (e, row) {
      const noChildWasClicked = e.target.tagName === 'TR' || e.target.tagName === 'TD'
      if (noChildWasClicked) {
        this.$emit('click-row', row)
      }
    }
  }
}
</script>
