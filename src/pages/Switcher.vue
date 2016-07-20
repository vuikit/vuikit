<template>
  <div class="uk-block">
    <h2>Switcher</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-subnav pill v-ref:nav>
      <vk-subnav-item>Item 1</vk-subnav-item>
      <vk-subnav-item>Item 2</vk-subnav-item>
      <vk-subnav-item>Item 3</vk-subnav-item>
    </vk-subnav>
    <vk-switcher v-ref:demo
      :connect="$refs.nav"
      :animation="props.animation.demo.value"
      :swiping="props.swiping.demo.value">
      <vk-switch>Content 1</vk-switch>
      <vk-switch>Content 2</vk-switch>
      <vk-switch>Content 3</vk-switch>
    </vk-switcher>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-switcher</code> component together with <code>vk-switch</code> allows transitioning through different content panes.
    </div>
    <!-- TABS -->
    <vk-tabs>
      <vk-tab label="Props">
        <vk-docs-props :props="props"></vk-docs-props>
      </vk-tab>
      <vk-tab label="Slots">
        <vk-subnav line v-ref:slots-nav>
          <vk-subnav-item>vk-switcher</vk-subnav-item>
          <vk-subnav-item>vk-switch</vk-subnav-item>
        </vk-subnav>
        <vk-switcher :connect="$refs.slotsNav">
          <vk-switch>
            <vk-docs-slots :slots="slotsSwitcher"></vk-docs-slots>
          </vk-switch>
          <vk-switch>
            <vk-docs-slots :slots="slotsSwitch"></vk-docs-slots>
          </vk-switch>
        </vk-switcher>
      </vk-tab>
      <vk-tab label="Events">
        <vk-docs-events
          :events="events"
          :connect="$refs.demo">
        </vk-docs-events>
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code :code="code"></vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import { merge, pick } from 'lodash'
import Switcher from '../lib/Switcher'
import $ from 'jquery'
import mixin from './_mixin'

export default {
  mixins: [mixin],
  data: () => ({
    props: merge(props, pick(Switcher.props, Object.keys(props))),
    slotsSwitcher,
    slotsSwitch,
    events,
    example
  }),
  watch: {
    // update demo animation when changed
    'props.animation.demo.value' (value) {
      $(this.$refs.nav.$el).data('switcher').options.animation = value
    }
  }
}

const props = {
  connect: {
    description: `Determines the related navigational container. Can be a DOM or
      Vue component reference.`
  },
  animation: {
    description: `Determines the item animation when toggling between them. The
      provided animations are <code>fade</code>, <code>scale</code>, <code>slide-top</code>,
      <code>slide-bottom</code>, <code>slide-left</code>, <code>slide-right</code>,
      <code>slide-horizontal</code> and <code>slide-vertical</code>, but you can
      apply multiple or custom animations by using the <code>uk-animation-*</code> classes
      from the <a href="http://getuikit.com/docs/animation.html" target="_blank">UIkit Animation</a> component.`,
    demo: {
      options: ['fade', 'scale', 'slide-top', 'slide-bottom', 'slide-left', 'slide-right', 'slide-horizontal', 'slide-vertical']
    }
  },
  swiping: {
    description: 'Determines whether or not the content can be changed on swipe.',
    demo: {}
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

const example =
`<vk-subnav v-ref:nav {attrs}>
  <vk-subnav-item>Item 1</vk-subnav-item>
  <vk-subnav-item>Item 2</vk-subnav-item>
  <vk-subnav-item>Item 3</vk-subnav-item>
</vk-subnav>
<vk-switcher
  :connect="$refs.nav">
  <vk-switch>Content 1</vk-switch>
  <vk-switch>Content 2</vk-switch>
  <vk-switch>Content 3</vk-switch>
</vk-switcher>`
</script>
