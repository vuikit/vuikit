<template>
  <docs-page
    component="switcher"
    :props="props"
    :code-pre="codePre"
    :code-slot="codeSlot"
    :slots="true"
    :events="events">
    <div slot="demo">
      <vk-subnav pill v-ref:nav>
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
      The <code>vk-switcher</code> component together with <code>vk-switch</code> allows transitioning through different content panes.
    </div>
    <div slot="slots">
      <vk-subnav line v-ref:slots-nav>
        <vk-subnav-item>vk-switcher</vk-subnav-item>
        <vk-subnav-item>vk-switch</vk-subnav-item>
      </vk-subnav>
      <vk-switcher :connect="$refs.slotsNav">
        <vk-switch>
          <table-slots :rows="slotsSwitcher"></table-slots>
        </vk-switch>
        <vk-switch>
          <table-slots :rows="slotsSwitch"></table-slots>
        </vk-switch>
      </vk-switcher>
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
    slotsSwitcher,
    slotsSwitch,
    events,
    codePre,
    codeSlot
  }),
  watch: {
    'props.animation.value' (value) {
      UI.$(this.$refs.nav.$el).data('switcher').options.animation = value
    }
  }
}

const codePre =
`<vk-subnav v-ref:nav>
  <vk-subnav-item>Item 1</vk-subnav-item>
  <vk-subnav-item>Item 2</vk-subnav-item>
  <vk-subnav-item>Item 3</vk-subnav-item>
</vk-subnav>`

const codeSlot =
`<vk-switch>Content 1</vk-switch>
<vk-switch>Content 2</vk-switch>
<vk-switch>Content 3</vk-switch>`

const props = {
  connect: {
    description: `Determines the related navigational container. Can be a DOM or
      Vue component reference.`,
    demo: false,
    value: 'nav'
  },
  animation: {
    description: `Determines the item animation when toggling between them. The
      provided animations are <code>fade</code>, <code>scale</code>, <code>slide-top</code>,
      <code>slide-bottom</code>, <code>slide-left</code>, <code>slide-right</code>,
      <code>slide-horizontal</code> and <code>slide-vertical</code>, but you can
      apply multiple or custom animations by using the <code>uk-animation-*</code> classes
      from the <a href="http://getuikit.com/docs/animation.html" target="_blank">UIkit Animation</a> component.`,
    options: ['fade', 'scale', 'slide-top', 'slide-bottom', 'slide-left', 'slide-right', 'slide-horizontal', 'slide-vertical']
  },
  swiping: {
    description: 'Determines whether or not the content can be changed on swipe.'
  }
}

const slotsSwitcher = {
  default: {
    description: 'The list of <code>vk-switch</code> components.'
  }
}

const slotsSwitch = {
  default: {
    description: 'The content of the pane. Can be text, HTML or event other components.'
  }
}

const events = {
  change: {
    description: 'Emited when the selected item has changed.'
  }
}

</script>
