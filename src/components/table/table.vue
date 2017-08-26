<template>
  <table class="uk-table"
    :class="{
      'uk-table-hover': hover,
      'uk-table-small': small,
      'uk-table-middle': middle,
      'uk-table-justify': justify,
      'uk-table-divider': divider,
      'uk-table-striped': striped,
      'uk-table-responsive': responsive
    }"
  >
    <thead>
      <tr>
        <slot></slot>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in data"
        :class="getRowClass(row)"
        @click="e => emitClickRow(e, row)"
      >
        <cell v-for="col in columns"
          :key="getKey(col)"
          :col="col"
          :row="row"
        ></cell>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { isFunction, warn } from '@vuikit/util'

const Cell = {
  functional: true,
  props: ['row', 'col'],
  render (h, { data, props }) {
    const { col, row } = props
    const cellRender = col.$vnode.componentOptions.Ctor.options.cellRender

    if (cellRender) {
      return cellRender.call(col, h, row)
    } else {
      warn('Missing cellRender', col)
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
    small: {
      type: Boolean,
      default: false
    },
    middle: {
      type: Boolean,
      default: false
    },
    divider: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    justify: {
      type: Boolean,
      default: false
    },
    responsive: {
      type: Boolean,
      default: false
    },
    sortedBy: {
      type: Object,
      default: () => ({}) // { field: [asc|desc] }
    },
    rowClass: {
      type: Function
    },
    selection: {
      type: Array,
      default: () => []
    },
    highlight: {
      type: Boolean,
      default: false
    },
    select: {
      type: Boolean,
      default: false
    },
    singleSelect: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    children: [],
    forcingUpdate: false
  }),
  computed: {
    columns: {
      get () {
        return this.children
          .filter(child => child.$el.nodeName === 'TH')
          .sort(this.sortAsSlots)
      },
      cache: false
    },
    selectedRows () {
      return this.data.filter(this.isSelected)
    },
    isAllSelected () {
      return this.selectedRows.length && (this.selectedRows.length === this.data.length)
    }
  },
  methods: {
    getKey (col) {
      return JSON.stringify({ name: col.name, props: col.$options.propsData })
    },
    forceUpdateOnce () {
      if (!this.forcingUpdate) {
        this.forcingUpdate = true
        this.$forceUpdate()
        return
      }
      this.forcingUpdate = false
    },
    getRowClass (row, index) {
      const classes = []

      if (isFunction(this.rowClass)) {
        classes.push(this.rowClass(row, index))
      }

      if (this.highlight && this.isSelected(row)) {
        classes.push('uk-active')
      }

      return classes.join(' ')
    },
    emitClickRow (e, row) {
      const noChildWasClicked = e.target.tagName === 'TR' || e.target.tagName === 'TD'
      if (noChildWasClicked) {
        this.$emit('click-row', row)
      }
    },
    sortAsSlots (a, b) {
      const slots = this.$slots.default.filter(s => s.tag)
      const indexA = slots.findIndex(findByProps(a))
      const indexB = slots.findIndex(findByProps(b))

      if (indexA === indexB) return 0
      return (indexA > indexB) ? 1 : -1
    },
    // row selection related
    isSelected (row) {
      return this.selection.findIndex(r => r.id === row.id) !== -1
    },
    selectRow (row) {
      const newSelection = [...this.selection, row]
      this.triggerUpdateEvent(newSelection)
    },
    unselectRow (row) {
      const newSelection = [...this.selection]
      newSelection.splice(this.selection.indexOf(row), 1)
      this.triggerUpdateEvent(newSelection)
    },
    toggleSelection (row) {
      this.isSelected(row)
        ? this.unselectRow(row)
        : this.selectRow(row)
      this.$forceUpdate()
    },
    triggerUpdateEvent (selection) {
      this.$emit('update:selection', selection)
    }
  },
  created () {
    this.$on('click-row', row => {
      if (this.singleSelect) {
        this.$emit('update:selection', [row])
      } else if (this.select) {
        this.toggleSelection(row)
      }
    })
  },
  mounted () {
    // workaround for reactivity
    this.children = this.$children
  },
  updated () {
    // workaround for edge situations
    // where children reactivity fails
    this.forceUpdateOnce()
  }
}

const findByProps = comp => slot => {
  if (!slot.componentOptions || !comp.$options) {
    return false
  }
  const propsSlot = slot.componentOptions.propsData
  const propsComp = comp.$options.propsData
  return JSON.stringify(propsSlot) === JSON.stringify(propsComp)
}
</script>
