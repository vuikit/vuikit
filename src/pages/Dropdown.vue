<template>
  <layouts-default>
    <div class="uk-block">
      <h2>Dropdown</h2>
      <hr class="uk-article-divider">
      <!-- DEMO -->
      <vk-button>
        Toggle
        <i class="uk-icon-caret-down"></i>
        <vk-dropdown ref="dropdown"
          :show="props.show.demo.value"
          :placement="props.placement.demo.value"
          :transition="props.transition.demo.value"
          :offset="props.offset.demo.value"
          :blank="props.blank.demo.value"
          :fix-width="props.fixWidth.demo.value"
          :scrollable="props.scrollable.demo.value"
          @clickIn="events.clickIn.emited = true"
          @clickOut="
            props.show.demo.value = false,
            events.clickOut.emited = true
          "
          @targetClick="
            props.show.demo.value = !props.show.demo.value,
            events.targetClick.emited = true
          "
          @targetHoverIn="events.targetHoverIn.emited = true"
          @targetHoverOut="events.targetHoverOut.emited = true">
          <ul class="uk-nav uk-nav-dropdown">
            <li class="uk-nav-header">Header</li>
            <li><a href="#" @click.prevent>Item</a></li>
            <li><a href="#" @click.prevent>Another item</a></li>
          </ul>
        </vk-dropdown>
      </vk-button>
      <!-- DESC -->
      <div class="uk-margin-large">
        The <code>vk-dropdown</code> component renders a toggleable dropdown.
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
import Component from '../lib/Dropdown'
import mixin from './_mixin'
import { mergeProps } from '../helpers/pages'

export default {
  name: 'PageDropdown',
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
  target: {
    description: `The Vue reference or dom query for the element to which the
      dropdown should be attached to. If omited the <code>$parent.$el</code>
      will be used.`
  },
  show: {
    description: 'Display state that when toggled will hide/show the dropdown.',
    demo: {
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
  transition: {
    description: `Specifies the transition name to be used by the transition
      wrapper component.`,
    demo: {
      type: 'Select',
      options: [
        { text: 'Default', value: '' },
        { text: 'Fade', value: 'vk-transition-fade' }
      ],
      value: ''
    }
  },
  offset: {
    description: `The dropdown attachment point offset with <code>vertical horizontal</code> syntax.
      Accepts <code>px</code> or <code>%</code> values being percentages the height and width of the target.`,
    demo: {
      type: 'Select',
      options: [
        { text: 'default', value: '0 0' },
        { text: '10px 10px', value: '10px 10px' },
        { text: '-10px -10px', value: '-10px -10px' }
      ],
      value: '0 5'
    }
  },
  blank: {
    description: 'Wheter to render the dropdown without any styling.',
    demo: {
      value: false
    }
  },
  fixWidth: {
    description: 'Wether to set a dropdown fixed width and wrap its text content into the next line.',
    demo: {
      value: false
    }
  },
  scrollable: {
    description: 'Whether to give the dropdown a fixed height and enable its content to scroll.',
    demo: {
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
  targetHoverIn: {
    description: 'Emited when a mouse enter the target hover area.',
    emited: false
  },
  targetHoverOut: {
    description: 'Emited when a mouse left the target hover area.',
    emited: false
  }
}

const example =
`<vk-button id="target"
  @click.native="show = !show">
  Toggle
</vk-button>
<vk-dropdown {attrs}
  target="#target"
  :show="show">
  Dropdown
</vk-dropdown>`
</script>
