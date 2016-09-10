<template>
  <layouts-default>
    <div class="uk-block">
      <h2>Dropdown</h2>
      <hr class="uk-article-divider">
      <!-- DEMO -->
      <vk-button id="target"
        @click.native="props.show.demo.value = !props.show.demo.value">
        Toggle
        <i class="uk-icon-caret-down"></i>
      </vk-button>
      <vk-dropdown ref="dropdown"
        target="#target"
        :show="props.show.demo.value"
        :position="props.position.demo.value"
        :offset="props.offset.demo.value"
        :offset-target="props.offsetTarget.demo.value"
        :constrain-to-window="props.constrainToWindow.demo.value"
        :constrain-to-parent="props.constrainToParent.demo.value"
        :blank="props.blank.demo.value"
        :fix-width="props.fixWidth.demo.value"
        :scrollable="props.scrollable.demo.value"
        @clickIn="events.clickIn.emited = true"
        @clickOut="
          props.show.demo.value = false,
          events.clickOut.emited = true
        "
        @targetHoverIn="events.targetHoverIn.emited = true"
        @targetHoverOut="events.targetHoverOut.emited = true">
        <ul class="uk-nav uk-nav-dropdown">
          <li><a href="#" @click.prevent>Item</a></li>
          <li><a href="#" @click.prevent>Another item</a></li>
          <li class="uk-nav-header">Header</li>
          <li><a href="#" @click.prevent>Item</a></li>
          <li><a href="#" @click.prevent>Another item</a></li>
          <li class="uk-nav-divider"></li>
          <li><a href="#" @click.prevent>Separated item</a></li>
        </ul>
      </vk-dropdown>
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

const resetTethler = function () {
  return {
    handler (val) {
      const dropdown = this.$refs.dropdown
      dropdown.$nextTick(() => {
        dropdown.$tether.destroy()
        dropdown.init()
      })
    },
    immediate: false
  }
}

export default {
  name: 'PageDropdown',
  mixins: [mixin],
  data: () => ({
    tabsIndex: 0,
    props: mergeProps(Component.props, props),
    slots,
    events,
    example
  }),
  watch: {
    'props.position.demo.value': resetTethler(),
    'props.offset.demo.value': resetTethler(),
    'props.offsetTarget.demo.value': resetTethler(),
    'props.constrainToWindow.demo.value': resetTethler(),
    'props.constrainToParent.demo.value': resetTethler()
  }
}

const props = {
  show: {
    description: 'Display state that when toggled will hide/show the dropdown.',
    demo: {
      value: false
    }
  },
  target: {
    description: `The element or string to query the element to which the
      dropdown should stay adjacent.`
  },
  position: {
    description: 'Specifies the attachment point on the target to attach the dropdown to.',
    demo: {
      type: 'Select',
      options: [
        { text: 'top left', value: 'top left' },
        { text: 'left top', value: 'left top' },
        { text: 'left middle', value: 'left middle' },
        { text: 'left bottom', value: 'left bottom' },
        { text: 'bottom left', value: 'bottom left' },
        { text: 'bottom center', value: 'bottom center' },
        { text: 'bottom right', value: 'bottom right' },
        { text: 'right bottom', value: 'right bottom' },
        { text: 'right middle', value: 'right middle' },
        { text: 'right top', value: 'right top' },
        { text: 'top right', value: 'top right' },
        { text: 'top center', value: 'top center' }
      ],
      value: 'bottom left'
    }
  },
  transition: {
    description: `Specifies the transition name that will be used by the transition
      wrapper component.`
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
      value: '0 0'
    }
  },
  offsetTarget: {
    description: `The target attachment point offset with <code>vertical horizontal</code> syntax.
      Accepts <code>px</code> or <code>%</code> values being percentages the height and width of the target.`,
    demo: {
      type: 'Select',
      options: [
        { text: 'default', value: '0 0' },
        { text: '10px 10px', value: '10px 10px' },
        { text: '-10px -10px', value: '-10px -10px' }
      ],
      value: '0 0'
    }
  },
  constrainToWindow: {
    description: `Whether to flip the dropdown when it would otherwise be outside the viewport.
      This will cause dropdowns with bottom attachments to switch to top when colliding with the
      bottom of the page and vice-versa.`,
    demo: {
      value: true
    }
  },
  constrainToParent: {
    description: `Similar to <code>constrainToWindow</code> but for the target element's first
      scroll parent: the first parent that has <code>overflow: auto</code> or <code>overflow: scroll</code>
      set, or the body, whichever comes first.`,
    demo: {
      value: true
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
  },
  tetherOptions: {
    description: `Additional options can be passed to the underlying Tether instance used
      to position the dropdown. See the the <a href="http://tether.io/" target="_blank">Tether</a>
      documentation for more information.`
  }
}

const slots = {
  default: {
    description: 'The container for the dropdown content.'
  }
}

const events = {
  clickIn: {
    description: 'Emited when a click was performed inside of the dropdown.',
    emited: false
  },
  clickOut: {
    description: 'Emited when a click was performed outside of the dropdown while open.',
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
