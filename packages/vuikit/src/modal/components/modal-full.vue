<template>
  <ModalTransition appear>
    <ElModalFull
      :class="{ 'uk-open': open }"
      v-show="show"
      v-bind="pickComponentProps($props, 'ElModalFull')"
    >
      <slot/>
    </ElModalFull>
  </ModalTransition>
</template>

<script>
import { assign, get } from 'vuikit/src/_core/utils/object'
import { mergeData } from 'vuikit/src/_core/utils/vue'

import core from '../core'
import * as elements from '../elements'
import mixinProps from 'vuikit/src/_core/mixins/props'

export default {
  name: 'VkModalFull',
  extends: core,
  mixins: [ mixinProps ],
  components: assign({}, elements),
  beforeUpdate () {
    // workaround to add a default modifier class to the close button
    (this.$slots.default || []).forEach(node => {
      if (get(node, 'fnOptions.name') === 'ElModalClose') {
        node.data = mergeData(node.data, { class: 'uk-modal-close-full' })
      }
    })
  }
}
</script>
