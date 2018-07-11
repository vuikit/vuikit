<template>
  <ElCard v-bind="pickComponentProps($props, 'ElCard')">

    <slot name="top"/>

    <ElCardMediaTop v-if="$slots['media-top']">
      <slot name="media-top"/>
    </ElCardMediaTop>
    <ElCardBadge v-if="$slots.badge">
      <slot name="badge"/>
    </ElCardBadge>
    <ElCardHeader v-if="$slots.header">
      <slot name="header"/>
    </ElCardHeader>
    <ElCardMedia v-if="$slots['media']">
      <slot name="media"/>
    </ElCardMedia>
    <ElCardBody v-if="$slots.default">
      <slot/>
    </ElCardBody>
    <ElCardFooter v-if="$slots.footer">
      <slot name="footer"/>
    </ElCardFooter>
    <ElCardMediaBottom v-if="$slots['media-bottom']">
      <slot name="media-bottom"/>
    </ElCardMediaBottom>

    <slot name="bottom"/>

  </ElCard>
</template>

<script>
import { assign } from 'vuikit/src/_core/utils/object'

import * as elements from '../elements'
import mixinProps from 'vuikit/src/_core/mixins/props'

export default {
  mixins: [mixinProps],
  components: assign({}, elements),
  props: elements.ElCard.props
}
</script>
