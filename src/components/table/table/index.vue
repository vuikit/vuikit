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
      <row v-for="row in data" :row="row" :key="stringify(row)">
        <cell v-for="(col, i) in columns" :key="i" :col="col" :row="row"></cell>
      </row>
    </tbody>
  </table>
</template>

<script>
import Row from './row'
import Cell from './cell'
import MixinSelect from './mixin-select'
import { warn } from '~helpers/debug'
import stringify from '~utils/stringify'

export default {
  name: 'Table',
  components: { Row, Cell },
  mixins: [ MixinSelect ],
  inheritAttrs: false,
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
    rowClass: {
      type: Function
    }
  },
  data: () => ({
    children: []
  }),
  computed: {
    columns: {
      get () {
        // default slots excluding spaces and comments
        const slots = (this.$slots.default || [])
          .filter(vnode => vnode.tag)

        if (!slots.length) {
          warn('At least one TableColumn must be set', this)
        }

        return slots
      },
      cache: false
    }
  },
  methods: {
    stringify (obj) {
      return stringify(obj)
    }
  },
  created () {
    // forces the table to rerender
    // when children are available
    // which is required by some cols
    this.children = this.$children
  }
}
</script>
