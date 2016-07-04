<template>
  <div class="uk-block">
    <h2>Dropdown</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-button v-el:button>
      Trigger
      <i class="uk-icon-caret-down"></i>
    </vk-button>
    <vk-dropdown v-ref:demo
      :target="$els.button"
      :blank="props.blank.demo.value"
      :fix="props.fix.demo.value"
      :open-on="props.openOn.demo.value"
      :position="props.position.demo.value"
      :scrollable="props.scrollable.demo.value"
      :offset="props.offset.demo.value"
      :offset-target="props.offsetTarget.demo.value"
      :constrain-to-window="props.constrainToWindow.demo.value"
      :constrain-to-parent="props.constrainToParent.demo.value">
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
    <vk-tabs>
      <vk-tab label="Props">
        <vk-docs-props :props="props"></vk-docs-props>
      </vk-tab>
      <vk-tab label="Slots">
        <vk-docs-slots :slots="slots"></vk-docs-slots>
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code :code="code"></vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import { merge, pick } from 'lodash'
import Component from '../lib/Dropdown'
import mixin from './_mixin'

const resetTethler = function () {
  return {
    handler () {
      const dropdown = this.$refs.demo
      dropdown.$tether.destroy()
      dropdown.initTether()
    },
    immediate: false
  }
}

export default {
  mixins: [mixin],
  data: () => ({
    props: merge(props, pick(Component.props, Object.keys(props))),
    slots,
    example
  }),
  watch: {
    'props.openOn.demo.value': {
      handler () {
        const dropdown = this.$refs.demo
        // reset node events
        dropdown.removeEvents()
        dropdown.setupEvents()
      },
      immediate: false
    },
    'props.position.demo.value': resetTethler(),
    'props.offset.demo.value': resetTethler(),
    'props.offsetTarget.demo.value': resetTethler(),
    'props.constrainToWindow.demo.value': resetTethler(),
    'props.constrainToParent.demo.value': resetTethler()
  }
}

const props = {
  target: {
    description: 'The element the dropdown should stay adjacent to on the page.'
  },
  show: {
    description: 'Display state that when toggled will hide/show the dropdown.'
  },
  blank: {
    description: 'Wheter to render the dropdown without any styling.',
    demo: {}
  },
  fix: {
    description: 'Wether to set a dropdown fixed width and wrap its text content into the next line.',
    demo: {}
  },
  openOn: {
    description: `Specifies what event on the target opens the dropdown. If set
      to <code>false</code> the dropdown instance will have to be opened externally.
      If set as <code>always</code> the dropdown will be open immediately when it's
      rendered and left open.`,
    demo: {
      options: ['hover', 'focus', 'always'],
      value: 'click'
    }
  },
  position: {
    description: 'Specifies the attachment point on the target to attach the dropdown to.',
    demo: {
      options: [
        'top left',
        'left top',
        'left middle',
        'left bottom',
        'bottom center',
        'bottom right',
        'right bottom',
        'right middle',
        'right top',
        'top right',
        'top center'
      ],
      value: 'bottom left'
    }
  },
  scrollable: {
    description: 'Whether to give the dropdown a fixed height and enable its content to scroll.',
    demo: {}
  },
  offset: {
    description: `The dropdown attachment point offset with <code>vertical horizontal</code> syntax.
      Accepts <code>px</code> or <code>%</code> values being percentages the height and width of the target.`,
    demo: {
      options: ['10px 10px', '-10px -10px'],
      value: '0 0'
    }
  },
  offsetTarget: {
    description: `The target attachment point offset with <code>vertical horizontal</code> syntax.
      Accepts <code>px</code> or <code>%</code> values being percentages the height and width of the target.`,
    demo: {
      options: ['10px 10px', '-10px -10px'],
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

const example =
`<vk-button v-el:button>
  Trigger
  <i class="uk-icon-caret-down"></i>
</vk-button>
<vk-dropdown :target="$els.button" {attrs}>
  Dropdown
</vk-dropdown>`
</script>
