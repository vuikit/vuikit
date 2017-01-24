<template>
  <layouts-default>
    <h1>Dropdown</h1>
    Display a toggleable dropdown.
    <hr class="uk-article-divider">
    <div class="uk-margin">
      <vk-button>
        Toggle
        <i class="uk-icon-caret-down"></i>
        <vk-dropdown ref="dropdown"
          :show="props.show.demo.value"
          :placement="props.placement.demo.value"
          :transition="props.transition.demo.value"
          :blank="props.blank.demo.value"
          :expand="props.expand.demo.value"
          @clickIn="events.clickIn.emited = true"
          @clickOut="
            events.clickOut.emited = true
            props.show.demo.value = false
          "
          @targetClick="
            props.show.demo.value = !props.show.demo.value,
            events.targetClick.emited = true
          "
          @targetMouseenter="events.targetMouseenter.emited = true"
          @targetMouseleave="events.targetMouseleave.emited = true">
          Any content can be placed here, even another component.
        </vk-dropdown>
      </vk-button>
    </div>
    <!-- TABS -->
    <vk-tabs
      :activeTab="activeTab"
      @change="tab => { activeTab = tab }">
      <vk-tab label="Props">
        <vk-docs-props
          :props="props"
          @change="(prop, value) => props[prop].demo.value = value">
        </vk-docs-props>
      </vk-tab>
      <vk-tab label="Slots">
        <vk-docs-slots :slots="slots" />
      </vk-tab>
      <vk-tab label="Events">
        <vk-docs-events :events="events" />
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </layouts-default>
</template>

<script>
import Component from 'lib/Dropdown'
import mixin from './_mixin'
import { mergeProps } from 'helpers/pages'

export default {
  name: 'PageDropdown',
  mixins: [mixin],
  data: () => ({
    activeTab: 1,
    props: mergeProps(Component.props, props),
    slots,
    events,
    example
  })
}

const props = {
  target: {
    description: `The dom element to which the Dropdown should be attached to.
      Defaults to parent node.`
  },
  show: {
    description: 'Display state that when toggled will hide/show the dropdown.',
    demo: {
      type: 'Boolean',
      value: false
    }
  },
  placement: {
    description: 'Specifies the placement point of the dropdown.',
    demo: {
      type: 'Select',
      options: [
        { text: 'top', value: 'top' },
        { text: 'top-start', value: 'top-start' },
        { text: 'top-end', value: 'top-end' },
        { text: 'right', value: 'right' },
        { text: 'right-start', value: 'right-start' },
        { text: 'right-end', value: 'right-end' },
        { text: 'bottom', value: 'bottom' },
        { text: 'bottom-start', value: 'bottom-start' },
        { text: 'bottom-end', value: 'bottom-end' },
        { text: 'left', value: 'left' },
        { text: 'left-start', value: 'left-start' },
        { text: 'left-end', value: 'left-end' }
      ],
      value: 'bottom-start'
    }
  },
  modifiers: {
    description: `Modifiers are setting that alter the behavior of the popper, such as the offset.
      Checkout the <a href="https://popper.js.org/popper-documentation.html">Popper.js Documentation</a>
      for all possibilities.`
  },
  transition: {
    description: `Specifies the transition name to be used by the transition
      wrapper component.`,
    demo: {
      type: 'Select',
      options: [
        { text: 'Default', value: 'vk-dropdown-transition' },
        { text: 'Fade', value: 'vk-transition-fade' },
        { text: 'Disabled', value: false }
      ],
      value: 'vk-transition-fade'
    }
  },
  blank: {
    description: 'Wheter to render the dropdown without any styling.',
    demo: {
      type: 'Boolean',
      value: false
    }
  },
  expand: {
    description: `By default the dropdown width is limited by the theme, set this options to
      true in order to remove that limit.`,
    demo: {
      type: 'Boolean',
      value: false
    }
  }
}

const slots = {
  default: {
    description: 'The container for the dropdown content.'
  }
}

const events = {
  clickIn: {
    description: 'Emited when a click is performed inside of the dropdown.',
    emited: false
  },
  clickOut: {
    description: 'Emited when a click is performed outside of the dropdown while open.',
    emited: false
  },
  targetClick: {
    description: 'Emited when a click is made on the target.',
    emited: false
  },
  targetMouseenter: {
    description: 'Emited when a mouse enter the target hover area.',
    emited: false
  },
  targetMouseleave: {
    description: 'Emited when a mouse left the target hover area.',
    emited: false
  }
}

const example =
`<button @click="show = !show">
  Toggle
  <vk-dropdown :show="show">
    Dropdown
  </vk-dropdown>
</button>`
</script>
