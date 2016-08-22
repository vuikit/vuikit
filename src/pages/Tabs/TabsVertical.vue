<template>
  <div class="uk-block">
    <h2>Tabs Vertical</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-tabs-vertical
      :index="demoIndex"
      :align="props.align.demo.value"
      :width="props.width.demo.value"
      :body-width="props.bodyWidth.demo.value"
      @change="demoIndex = arguments[0]">
      <vk-tabs-item>Tab 1</vk-tabs-item>
      <vk-tabs-item>Tab 2</vk-tabs-item>
      <vk-tabs-item>Tab 3</vk-tabs-item>
      <vk-tabs-item disabled>Tab 4</vk-tabs-item>
      <vk-switcher slot="switcher"
        :index="demoIndex">
        <vk-switcher-item>Content Tab 1</vk-switcher-item>
        <vk-switcher-item>Content Tab 2</vk-switcher-item>
        <vk-switcher-item>Content Tab 3</vk-switcher-item>
      </vk-switcher>
    </vk-tabs-vertical>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-tabs-vertical</code> component is a variation that renders a
      vertical tabbed navigation.
    </div>
    <!-- TABS -->
    <tm-tabs>
      <tm-tabs-item name="Props">
        <vk-docs-props
          :props="props"
          @change="props[arguments[0]].demo.value = arguments[1]">
        </vk-docs-props>
      </tm-tabs-item>
      <tm-tabs-item name="Slots">
        <vk-docs-slots :slots="slots"></vk-docs-slots>
      </tm-tabs-item>
      <tm-tabs-item name="Example">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </tm-tabs-item>
    </tm-tabs>
  </div>
</template>

<script>
import Component from '../../lib/TabsVertical'
import mixin from '../_mixin'
import { mergeProps } from '../../helpers/pages'

export default {
  mixins: [mixin],
  data: () => ({
    demoIndex: 0,
    props: mergeProps(Component.props, props),
    slots,
    example
  })
}

const props = {
  align: {
    description: 'Determines the tabs vertical alignment.',
    demo: {
      type: 'Select',
      options: [
        { text: 'left', value: 'left' },
        { text: 'right', value: 'right' }
      ],
      value: 'left'
    }
  },
  width: {
    description: 'Determines the tabs width using the <i>UIkit Grid</i> classes.',
    demo: {
      type: 'Select',
      options: [
        { text: '1-2', value: '1-2' },
        { text: '1-3', value: '1-3' },
        { text: '1-4', value: '1-4' },
        { text: '2-3', value: '2-3' }
      ],
      value: '1-3'
    }
  },
  bodyWidth: {
    description: 'Determines the content width using the <i>UIkit Grid</i> classes.',
    demo: {
      type: 'Select',
      options: [
        { text: '1-2', value: '1-2' },
        { text: '1-3', value: '1-3' },
        { text: '1-4', value: '1-4' },
        { text: '2-3', value: '2-3' }
      ],
      value: '2-3'
    }
  }
}

const slots = {
  default: {
    description: 'The list of <code>vk-tabs-item</code> components.'
  },
  switcher: {
    description: `The place for the <code>vk-switcher</code> or any component that
      will deal with the content`
  }
}

const example =
`<vk-tabs-vertical {attrs}
  @change="index = arguments[0]">
  <tm-tabs-item>Tab 1</tm-tabs-item>
  <tm-tabs-item>Tab 2</tm-tabs-item>
  <tm-tabs-item>Tab 3</tm-tabs-item>
  <tm-tabs-item disabled>Tab 4</tm-tabs-item>
  <vk-switcher slot="switcher"
    :index="index">
    <vk-switcher-item>Content Tab 1</vk-switcher-item>
    <vk-switcher-item>Content Tab 2</vk-switcher-item>
    <vk-switcher-item>Content Tab 3</vk-switcher-item>
  </vk-switcher>
</vk-tabs-vertical>`
</script>
