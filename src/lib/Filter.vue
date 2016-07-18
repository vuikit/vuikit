<template>
  <div class="vk-filter uk-form">
    <div class="uk-flex">
      <vk-button v-ref:button
        v-if="filters"
        icon-right="caret-down">
        Filters
      </vk-button>
      <div class="uk-form-icon uk-flex-item-1">
        <i v-if="query && enableReset"
          class="uk-icon-remove uk-link"
          style="pointer-events: auto;"
          @click="query = ''">
        </i>
        <i v-else
          class="uk-icon-search">
        </i>
        <input v-el:input
          type="text"
          class="uk-width-1-1"
          debounce="500"
          v-model="query">
      </div>
    </div>
    <vk-dropdown v-ref:dropdown
      v-if="$refs.button"
      :target="$refs.button.$el"
      fix-width>
      <ul class="uk-nav uk-nav-dropdown">
        <li v-for="(filter, filterQuery) in filters">
          <a href=""
            v-text="filter"
            @click.prevent="query = filterQuery, $refs.dropdown.close()">
          </a>
        </li>
      </ul>
    </vk-dropdown>
  </div>
</template>

<script>
import Button from './Button'
import Dropdown from './Dropdown'
import sQuery from 'search-query-parser'

export default {
  name: 'VkFilter',
  components: {
    VkButton: Button,
    VkDropdown: Dropdown
  },
  props: {
    // eg: { 'Filter Foo': 'is:bar', 'Filter Bar'... }
    filters: {
      type: [Boolean, Object],
      default: false
    },
    parser: {
      type: Object,
      default: () => ({
        keywords: [],
        ranges: []
      })
    },
    // enables the reset btn
    enableReset: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    query: ''
  }),
  computed: {
    parsed () {
      return sQuery.parse(this.query, this.parser)
    }
  },
  watch: {
    query () {
      this.$emit('query', this.parsed, this.query)
    }
  }
}
</script>
