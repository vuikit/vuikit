<template>
  <layouts-default>
    <div class="uk-block">
      <h2>Offcanvas</h2>
      <hr class="uk-article-divider">
      <!-- DEMO -->
      <vk-button
        @click.native="props.show.demo.value = true">
        Show
      </vk-button>
      <vk-offcanvas
        :show="props.show.demo.value"
        :flip="props.flip.demo.value"
        @clickIn="events.clickIn.emited = true"
        @clickOut="
          events.clickOut.emited = true,
          props.show.demo.value = false
        "
        @keyEsc="
          events.keyEsc.emited = true,
          props.show.demo.value = false
        ">
        <div class="uk-panel">
          <h3 class="uk-panel-title">Panel title</h3>
          Lorem ipsum dolor sit amet, <a href="#">consectetur</a> adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </div>
        <div class="uk-panel">
          <h3 class="uk-panel-title">Panel title</h3>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </vk-offcanvas>
      <!-- DESC -->
      <div class="uk-margin-large">
        The <code>vk-offcanvas</code> component, based on UIkit Offcanvas, creates
        a smooth off-canvas sidebar that slides in and out of the page.
      </div>
      <!-- TABS -->
      <vk-tabs
        :index="tabsIndex"
        @change="tabsIndex = arguments[0]">
        <vk-tabs-item name="Props">
          <vk-docs-props
            :props="props"
            @change="props[arguments[0]].demo.value = arguments[1]">
          </vk-docs-props>
        </vk-tabs-item>
        <vk-tabs-item name="Slots">
          <vk-docs-slots :slots="slots"></vk-docs-slots>
        </vk-tabs-item>
        <vk-tabs-item name="Events">
          <vk-docs-events :events="events"></vk-docs-events>
        </vk-tabs-item>
        <vk-tabs-item name="Example">
          <vk-docs-code>{{ code }}</vk-docs-code>
        </vk-tabs-item>
      </vk-tabs>
    </div>
  </layouts-default>
</template>

<script>
import Component from '../lib/Offcanvas'
import mixin from './_mixin'
import { mergeProps } from '../helpers/pages'

export default {
  name: 'PageOffcanvas',
  mixins: [mixin],
  data: () => ({
    tabsIndex: 0,
    props: mergeProps(Component.props, props),
    slots,
    events,
    example
  })
}

const props = {
  show: {
    description: 'Display state that when toggled will hide/show the off-canvas.',
    demo: {
      value: false
    }
  },
  flip: {
    description: 'Adjusts the off-canvas bar to slide in from the right.',
    demo: {
      value: false
    }
  },
  transition: {
    description: 'The transition name to be used for the switch animation.',
    demo: {
      type: 'Select',
      options: [],
      value: ''
    }
  }
}

const slots = {
  default: {
    description: 'The canvas content.'
  }
}

const events = {
  clickIn: {
    description: 'Emited when a click is performed inside the off-canvas bar.',
    emited: false
  },
  clickOut: {
    description: 'Emited when a click is performed outside the off-canvas bar.',
    emited: false
  },
  keyEsc: {
    description: 'Emited when the ESC key is pressed while the off-canvas is shown.',
    emited: false
  }
}

const example =
`<vk-button
  @click.native="show = true">
  Show
</vk-button>
<vk-offcanvas :show="show" {attrs}
  @clickOut="show = false">
  Content
</vk-offcanvas>`
</script>
