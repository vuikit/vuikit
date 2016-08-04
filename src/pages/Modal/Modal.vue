<template>
  <div class="uk-block" style="height: 1900px;">
    <h2>Modal</h2>
    <hr class="uk-article-divider">
    <!-- UK modal test -->
    <!-- This is a button toggling the modal -->
<button class="uk-button" data-uk-modal="{target:'#my-id'}">...</button>

<!-- This is the modal -->
<div id="my-id" class="uk-modal">
    <div class="uk-modal-dialog">
        <a class="uk-modal-close uk-close"></a>
        ... UIkit
    </div>
</div>
    <!-- DEMO -->
    <vk-button
      @click.native="props.show.demo.value = true">
      Open
    </vk-button>
    <vk-modal
      :show="props.show.demo.value"
      :large="props.large.demo.value"
      :center="props.center.demo.value"
      @clickOut="
        props.show.demo.value = false,
        events.clickOut.emited = true
      "
      @clickIn="events.clickIn.emited = true"
      @inactive="
        props.show.demo.value = false,
        events.inactive.emited = true
      "
      @keyEsc="
        props.show.demo.value = false,
        events.keyEsc.emited = true
      ">
        <a class="uk-modal-close uk-close"
          @click="props.show.demo.value = false"
        ></a>
        ...
    </vk-modal>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-modal</code> component renders a modal.
    </div>
    <!-- TABS -->
    <vk-tabs>
      <vk-tab label="Props">
        <vk-docs-props
          :props="props"
          @change="props[arguments[0]].demo.value = arguments[1]">
        </vk-docs-props>
      </vk-tab>
      <vk-tab label="Events">
        <vk-docs-events :events="events"></vk-docs-events>
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import Component from '../../lib/Modal'
import mixin from '../_mixin'
import { mergeProps } from '../helper'

export default {
  mixins: [mixin],
  data: () => ({
    modal2show: false,
    props: mergeProps(Component.props, props),
    slots,
    events,
    example
  })
}

const props = {
  show: {
    type: Boolean,
    description: 'Display state that when toggled will hide/show the modal.',
    demo: {
      value: false
    }
  },
  center: {
    type: Boolean,
    description: 'Whether to center the modal vertically.',
    demo: {
      value: false
    }
  },
  large: {
    description: 'Whether to set the modal width as large as the site\'s container width.',
    demo: {
      value: false
    }
  }
}

const slots = {
  default: {
    description: `The modal main content. Check the <a href="http://getuikit.com/docs/modal.html">UIkit Modal</a>'
      documentation for all the possible content classes.`
  }
}

const events = {
  clickIn: {
    description: 'Emited when a click was performed inside the modal.',
    emited: false
  },
  clickOut: {
    description: 'Emited when a click was performed outside the modal while open.',
    emited: false
  },
  keyEsc: {
    description: 'Emited when the ESC key was pressed while the modal is opened.',
    emited: false
  },
  inactive: {
    description: 'Emited when a modal has beecome inactive due to another modal opening.',
    emited: false
  }
}

const example =
`<vk-modal {attrs}>
  <template slot="header">Headline</template>
  <div>Main content</div>
  <template slot="footer">Footer</template>
  <template slot="caption">Caption</template>
</vk-modal>`
</script>
