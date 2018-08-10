<template>
  <VkTableEl v-bind="pickComponentProps($props, 'VkTableEl')">
    <thead v-if="!headless">
      <VkTableElTr>
        <VkTableElTh v-for="(col, i) in columns" :key="i"
          v-bind="pickComponentProps(col.props, 'VkTableElTh')"
        >
          <component
            :is="{ functional: true, render: col.headRender }"
            v-bind="col.props"
          />
        </VkTableElTh>
      </VkTableElTr>
    </thead>
    <tbody>
      <VkTableElTr v-for="(row, rowIndex) in data" :key="rowIndex"
        :class="fnRowClass(row)"
        :active="fnRowActive(row)"
        @click="emitRowClickEvent('rowClick', row, $event)"
        @dblclick="emitRowClickEvent('rowDblclick', row, $event)"
      >
        <VkTableElTd v-for="(col, colIndex) in columns" :key="colIndex"
          v-bind="pickComponentProps(col.props, 'VkTableElTd')"
        >
          <component :is="{ functional: true, render: col.cellRender }"
            :row="row"
            :slots="col.slots"
            v-bind="col.props"
          />
        </VkTableElTd>
      </VkTableElTr>
    </tbody>
  </VkTableEl>
</template>

<script>
import { warn } from 'vuikit/src/_core/utils/debug'
import { assign, get } from 'vuikit/src/_core/utils/object'
import mixinProps from 'vuikit/src/_core/mixins/props'

import core from '../core'
import * as elements from '../elements'

export default {
  name: 'VkTable',
  extends: core,
  components: assign({}, elements),
  mixins: [mixinProps],
  props: {
    divided: {
      default: true
    },
    headless: {
      type: Boolean,
      default: false
    },
    fnRowClass: {
      type: Function,
      default: () => ''
    },
    fnRowActive: {
      type: Function,
      default: () => false
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
    mapColumnNode (node) {
      const data = node.data || {}

      const headRender = get(node, 'fnOptions.headRender')
      const cellRender = get(node, 'fnOptions.cellRender')

      if (!headRender) {
        warn(`[Vuikit Table]: The Column defined by ${node.tag} component has not set a headRender`, this)
      }

      if (!cellRender) {
        warn(`[Vuikit Table]: The Column defined by ${node.tag} component has not set a cellRender`, this)
      }

      return {
        props: data.props || {},
        slots: {
          static: data.staticSlots || {},
          scoped: data.scopedSlots || {}
        },
        headRender,
        cellRender
      }
    }
  }
}
</script>
