<template>
  <layouts-default>
    <div class="uk-block">
      <h2>Breadcrumb</h2>
      <hr class="uk-article-divider">
      <!-- DEMO -->
      <vk-breadcrumb
        :location="props.location.demo.value"
        @change="
          events.change.emited = true,
          props.location.demo.value = arguments[0]
        ">
        <vk-breadcrumb-item path="/">Home</vk-breadcrumb-item>
        <vk-breadcrumb-item path="/blog">Blog</vk-breadcrumb-item>
        <vk-breadcrumb-item path="/blog/category">Category</vk-breadcrumb-item>
        <vk-breadcrumb-item path="/blog/category/post" disabled>Post</vk-breadcrumb-item>
      </vk-breadcrumb>
      <!-- DESC -->
      <div class="uk-margin-large">
        The <code>vk-breadcrumb</code> component renders a UIkit breadcrumb.
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
        <vk-tabs-item name="Events">
          <vk-docs-events
            :events="events">
          </vk-docs-events>
        </vk-tabs-item>
        <vk-tabs-item name="Example">
          <vk-docs-code>{{ code }}</vk-docs-code>
        </vk-tabs-item>
      </vk-tabs>
    </div>
  </layouts-default>
</template>

<script>
import Component from '../lib/Breadcrumb'
import mixin from './_mixin'
import { mergeProps } from '../helpers/pages'

export default {
  name: 'PageBreadcrumb',
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
  location: {
    description: 'The current breadcrumb location.',
    demo: {
      type: 'Select',
      options: [
        { text: 'Home', value: '/' },
        { text: 'Blog', value: '/blog' },
        { text: 'Post', value: '/blog/category/post' }
      ],
      value: '/'
    }
  }
}

const slots = {
  default: {
    description: 'The list of <code>vk-breadcrumb-item</code> components.'
  }
}

const events = {
  change: {
    description: `Emited on the intention to change the location passing as
      argument the new path`,
    emited: false
  }
}

const example =
`<vk-breadcrumb {attrs}
  :location="location"
  @change="location = arguments[0]">
  <vk-breadcrumb-item path="/">Home</vk-breadcrumb-item>
  <vk-breadcrumb-item path="/blog">Blog</vk-breadcrumb-item>
  <vk-breadcrumb-item path="/blog/category">Category</vk-breadcrumb-item>
  <vk-breadcrumb-item path="/blog/category/post" disabled>Post</vk-breadcrumb-item>
</vk-breadcrumb>`
</script>
