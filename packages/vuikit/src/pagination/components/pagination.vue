<template>
  <ElPagination
    v-vk-margin
    v-bind="pickComponentProps($props, 'ElPagination')"
    :class="`uk-flex-middle uk-flex-${aligned}`"
  >
    <slot name="prev"/>
    <template v-if="!hidePages" v-for="(p, index) in pages">
      <ElPage
        v-if="isNumber(p)"
        :key="index"
        :text="p"
        :active="p === page"
        @click="$emit('update:page', p)"
      />
      <ElPageGroup v-else
        :key="index"
      />
    </template>
    <slot name="next"/>
  </ElPagination>
</template>

<script>
import { VkMargin } from 'vuikit/src/margin'
import { isNumber } from 'vuikit/src/_core/utils/lang'

import Matrix from 'vuikit/src/_core/utils/pagination-matrix'
import mixinProps from 'vuikit/src/_core/mixins/props'
import mixinPages from 'vuikit/src/_core/mixins/pages'

import { ElPagination, ElPage, ElPageGroup } from '../elements'

export default {
  name: 'VkPagination',
  mixins: [mixinProps, mixinPages],
  directives: { VkMargin },
  components: { ElPagination, ElPage, ElPageGroup },
  props: {
    hidePages: Boolean,
    aligned: {
      type: String,
      default: 'left',
      validator: v => /^(left|center|right)$/.test(v)
    },
    // visible pages around active one
    range: {
      type: Number,
      default: 3
    }
  },
  computed: {
    pages () {
      return Matrix({
        total: this.total,
        page: this.page,
        perPage: this.perPage,
        range: this.range
      })
    }
  },
  methods: {
    isNumber,
    update (page) {
      this.$emit('update:page', page)
    }
  }
}
</script>
