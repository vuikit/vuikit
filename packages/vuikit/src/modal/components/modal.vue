<template>
  <ModalTransition appear>
    <ElModal
      :class="{ 'uk-open': open }"
      v-show="show"
      v-bind="pickComponentProps($props, 'ElModal')"
      v-vk-modal-overflow-auto="scrollable"
    >
      <ElModalHeader v-if="$slots.header">
        <slot name="header"/>
      </ElModalHeader>
      <slot name="dialog" v-if="$slots.dialog"/> <!-- for customizations -->
      <ElModalBody v-if="$slots.default">
        <slot/>
      </ElModalBody>
      <ElModalFooter v-if="$slots.footer">
        <slot name="footer"/>
      </ElModalFooter>
    </ElModal>
  </ModalTransition>
</template>

<script>
import { assign } from 'vuikit/src/_core/utils/object'

import core from '../core'
import * as elements from '../elements'
import { mixinActive } from '../mixins'
import mixinProps from 'vuikit/src/_core/mixins/props'
import VkModalOverflowAuto from '../directives/overflow-auto'

import { SHOWN, HIDDEN } from '../constants'

export default {
  name: 'VkModal',
  extends: core,
  components: assign({}, elements),
  mixins: [ mixinProps, mixinActive ],
  directives: { VkModalOverflowAuto },
  props: {
    // TODO: Conditionally renders content on mounted.
    // Will only render content if activated
    // lazy: {},
    scrollable: {
      // enables the auto-overflow feature
      type: Boolean,
      default: false
    }
  },
  created () {
    this.$on(SHOWN, () => {
      this.setAsActive()
    })
    this.$on(HIDDEN, () => {
      this.setAsInactive()
    })
  }
}
</script>
