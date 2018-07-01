<template>
  <ElTable v-bind="pickComponentProps($props, 'ElTable')">
    <thead v-if="!headless">
      <ElTableTr>
        <ElTableTh v-for="(col, i) in columns" :key="i"
          v-bind="pickComponentProps(col.props, 'ElTableTh')"
        >
          <component
            :is="{ functional: true, render: col.headRender }"
            v-bind="col.props"
          />
        </ElTableTh>
      </ElTableTr>
    </thead>
    <tbody>
      <ElTableTr v-for="(row, rowIndex) in data" :key="rowIndex"
        :class="resolveRowClass(row)"
        :active="isRowSelected(row)"
        @click="onRowClick($event, row)"
      >
        <ElTableTd v-for="(col, colIndex) in columns" :key="colIndex"
          v-bind="pickComponentProps(col.props, 'ElTableTd')"
        >
          <component :is="{ functional: true, render: col.cellRender }"
            :row="row"
            :slots="col.slots"
            v-bind="col.props"
          />
        </ElTableTd>
      </ElTableTr>
    </tbody>
  </ElTable>
</template>

<script>
import { assign, get } from 'vuikit/src/_core/utils/object'
import { isFunction } from 'vuikit/src/_core/utils/lang'
import mixinProps from 'vuikit/src/_core/mixins/props'

import core from '../core'
import * as elements from '../elements'
import { mixinSelect } from '../mixins'

export default {
  name: 'VkTable',
  extends: core,
  components: assign({}, elements),
  mixins: [mixinSelect, mixinProps],
  props: {
    divided: {
      default: true
    },
    rowClass: {
      type: Function
    },
    headless: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    columns: {
      get () {
        return (this.$slots.default || []).filter(n => n.tag).map(this.mapColumnNode)
      },
      cache: false
    }
  },
  methods: {
    resolveRowClass (row) {
      return isFunction(this.rowClass)
        ? this.rowClass(row)
        : this.rowClass
    },
    onRowClick (e, row) {
      const isIgnoredTag = tag => /^(A|BUTTON)$/.test(tag)

      if (!isIgnoredTag(e.target.tagName)) {
        this.toggleRowSelection(row)
      }
    },
    mapColumnNode (node) {
      const data = node.data || {}

      return {
        props: data.props || {},
        slots: {
          static: data.staticSlots || {},
          scoped: data.scopedSlots || {}
        },
        headRender: node.fnOptions.headRender,
        cellRender: node.fnOptions.cellRender
      }
    }
  }
}
</script>
