<template>
  <div class="uk-block">
    <h2>Button Link</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-button-link
      :href="props.href.demo.value"
      @click.native.prevent>
      Link
    </vk-button-link>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-button-link</code> component renders an anchor extending
      <code>vk-button</code> output, thus the demo only reflects the differences.
    </div>
    <!-- TABS -->
    <vk-tabs>
      <vk-tab label="Props">
        <vk-docs-props
          :props="props"
          @change="props[arguments[0]].demo.value = arguments[1]">
        </vk-docs-props>
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import Component from '../../lib/ButtonLink'
import mixin from '../_mixin'
import { mergeProps } from '../helper'

export default {
  name: 'PageButtonLink',
  mixins: [mixin],
  data: () => ({
    props: mergeProps(Component.props, props),
    example
  })
}

const props = {
  href: {
    description: 'The link to be followed when the button is pressed.',
    demo: {
      editable: false,
      value: '#'
    }
  }
}

const example =
`<vk-button-link {attrs}>
  Link
</vk-button-link>`
</script>
