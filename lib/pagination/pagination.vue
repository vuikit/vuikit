<template>
  <ul class="uk-pagination" :class="{
    'uk-flex-center': alignment === 'center',
    'uk-flex-right': alignment === 'right'
  }">
    <slot></slot>
  </ul>
</template>

<script>
import { toArray, warn } from 'helpers/util'
import { addClass, removeClass, getClosest } from 'helpers/dom'
import paginationMatrix from 'helpers/pagination-matrix'

export default {
  name: 'VkPagination',
  props: {
    // currently active page
    active: {
      type: Number
    },
    // total amount of items
    total: {
      type: Number
    },
    // items displayed on each page
    limit: {
      type: Number
    },
    alignment: {
      type: String,
      default: 'left' // left|center|right|expand
    }
  },
  computed: {
    activePage: {
      get () {
        const activeEl = this.$el.querySelector('li.uk-active')
        return this.active || (activeEl && activeEl.innerText) && parseInt(activeEl.innerText.trim())
      },
      cache: false
    },
    prevPage: {
      get () {
        return this.activePage - 1
      },
      cache: false
    },
    nextPage: {
      get () {
        return this.activePage + 1
      },
      cache: false
    },
    pages () {
      const activeEl = this.$el.querySelector('li.uk-active')
      if (activeEl) {
        return toArray(this.$el.querySelectorAll('a'))
          .filter(el => !el.querySelector('span') && el.innerText)
          .map(el => parseInt(el.innerText.trim()))
      } else {
        return paginationMatrix({ active: this.active, total: this.total, limit: this.limit })
      }
    },
    lastPage () {
      return this.pages[this.pages.length - 1]
    }
  },
  updated () {
    this.updatePrevNextState()
  },
  mounted () {
    this.updatePrevNextState()
    // warn about missing props if 'vk-pagination-pages' is missing
    const activeEl = this.$el.querySelector('li.uk-active')
    if (warn && !activeEl && (!this.limit || !this.active || !this.total)) {
      warn(`[VkPagination warn]: the 'limit', 'active' and 'total' props must be set if 'vk-pagination-pages' is omited`)
    }
  },
  methods: {
    /**
     * As the parent of functional components stated through a slot
     * is the context and not the usual parent, we don't have the expected
     * parent/child relation. Thus, forced to do this kind of workarounds
     */
    updatePrevNextState () {
      const prev = toArray(this.$el.querySelectorAll('span[uk-pagination-previous]'))
      const next = toArray(this.$el.querySelectorAll('span[uk-pagination-next]'))

      // add/remove disabled classes
      this.prevPage < 1
        ? prev.forEach(el => addClass(el.parentNode.parentNode, 'uk-disabled'))
        : prev.forEach(el => removeClass(el.parentNode.parentNode, 'uk-disabled'))
      this.nextPage > this.lastPage
        ? next.forEach(el => addClass(el.parentNode.parentNode, 'uk-disabled'))
        : next.forEach(el => removeClass(el.parentNode.parentNode, 'uk-disabled'))

      // add expand classes
      if (this.alignment === 'expand') {
        const el = getClosest(next[0], 'li')
        addClass(el, 'uk-margin-auto-left')
      }
    }
  }
}
</script>
