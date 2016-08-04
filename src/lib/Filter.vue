<template>
  <div class="vk-filter uk-form" :data-uid="uid">
    <div class="uk-flex">
      <button type="button"
        v-if="filters"
        class="uk-button"
        @click="dropdown.show = true">
        Filters
        <i class="uk-icon-caret-down"></i>
      </button>
      <div class="uk-form-icon uk-flex-item-1">
        <i v-if="query && showReset"
          class="uk-icon-remove uk-link"
          style="pointer-events: auto;"
          @click="query = ''">
        </i>
        <i v-else
          class="uk-icon-search">
        </i>
        <input
          type="text"
          class="uk-width-1-1"
          debounce="500"
          v-model="query">
      </div>
    </div>
    <vk-dropdown
      v-if="filters"
      :target="'.vk-filter[data-uid=\'' + uid + '\']'"
      :show="dropdown.show"
      fix-width
      @clickOut="dropdown.show = false">
      <ul class="uk-nav uk-nav-dropdown">
        <li v-for="(filterQuery, filter) in filters">
          <a href=""
            v-text="filter"
            @click.prevent="
              query = filterQuery,
              dropdown.show = false
            ">
          </a>
        </li>
      </ul>
    </vk-dropdown>
  </div>
</template>

<script>
import Dropdown from './Dropdown'
import sQuery from 'search-query-parser'

export default {
  name: 'VkFilter',
  components: {
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
    // shows the reset btn
    showReset: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    dropdown: {
      show: false,
      target: ''
    },
    query: ''
  }),
  computed: {
    parsed () {
      return sQuery.parse(this.query, this.parser)
    },
    uid () {
      return this._uid
    }
  },
  watch: {
    query () {
      this.$emit('query', this.parsed, this.query)
    }
  }
}
</script>
