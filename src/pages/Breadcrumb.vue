<template>
  <vk-docs-layout-page>
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
        The <code>vk-breadcrumb</code> component renders a breadcrumb from an <code>Object</code> paths definition.
      </div>
      <!-- TABS -->
      <tm-tabs>
        <tm-tabs-item name="Props">
          <vk-docs-props
            :props="props"
            @change="props[arguments[0]].demo.value = arguments[1]">
          </vk-docs-props>
        </tm-tabs-item>
        <tm-tabs-item name="Events">
          <vk-docs-events
            :events="events">
          </vk-docs-events>
        </tm-tabs-item>
        <tm-tabs-item name="Example">
          <vk-docs-code>{{ code }}</vk-docs-code>
        </tm-tabs-item>
      </tm-tabs>
    </div>
  </vk-docs-layout-page>
</template>

<script>
import Component from '../lib/Breadcrumb'
import mixin from './_mixin'
import { mergeProps } from './helper'

export default {
  name: 'PageBreadcrumb',
  mixins: [mixin],
  data: () => ({
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
