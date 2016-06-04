<template>
  <docs-page
    :props="props"
    :events="events"
    :code="code">
    <div slot="demo">
      <vk-subnav style="pill" v-ref:nav>
        <vk-subnav-item>Item 1</vk-subnav-item>
        <vk-subnav-item>Item 2</vk-subnav-item>
        <vk-subnav-item>Item 3</vk-subnav-item>
      </vk-subnav>
      <vk-switcher v-ref:demo
        :connect="$refs.nav"
        :animation="props.animation.value"
        :swiping="props.swiping.value">
        <vk-switch>Content 1</vk-switch>
        <vk-switch>Content 2</vk-switch>
        <vk-switch>Content 3</vk-switch>
      </vk-switcher>
    </div>
    <div slot="desc">
      The <code>vk-switcher</code> component, when combined with nav components, allows transitioning through different content panes.
    </div>
  </docs-page>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'
import UI from 'uikit'

export default {
  mixins: [mixins],
  data: () => ({
    props: Helper.getProps('Switcher', props),
    events,
    code
  }),
  watch: {
    'props.animation.value' (value) {
      UI.$(this.$refs.nav.$el).data('switcher').options.animation = value
    }
  }
}

const code =
`<vk-switcher :connect="">
  <vk-switch>Content</vk-switch>
  <vk-switch>Content</vk-switch>
  <vk-switch>Content</vk-switch>
</vk-switcher>`

const props = {
  connect: {
    description: `Determines the related navigational container. Can be a DOM or
      Vue component reference.`,
    editable: false
  },
  animation: {
    description: `Determines the item animation when toggling between them. The
      provided animations are <code>fade</code>, <code>scale</code>, <code>slide-top</code>,
      <code>slide-bottom</code>, <code>slide-left</code>, <code>slide-right</code>,
      <code>slide-horizontal</code> and <code>slide-vertical</code>, but you can
      apply multiple or custom animations by using the <code>uk-animation-*</code> classes
      from the <a href="http://getuikit.com/docs/animation.html" target="_blank">UIkit Animation</a> component.`,
    options: ['default', 'fade', 'scale', 'slide-top', 'slide-bottom', 'slide-left', 'slide-right', 'slide-horizontal', 'slide-vertical']
  },
  swiping: {
    description: 'Determines whether or not the content can be changed on swipe.'
  }
}

const events = {
  change: {
    description: 'Emited on item selection change'
  }
}

</script>
