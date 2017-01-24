<template>
  <layouts-default>
    <h1>Breadcrumb</h1>
    Displays a user site location with breadcrumbs.
    <hr class="uk-article-divider">
    <div class="uk-margin">
      <vk-breadcrumb
        :location="props.location.demo.value"
        @change="location => {
          events.change.emited = true
          props.location.demo.value = location
        }">
        <vk-breadcrumb-item label="Home" path="/" />
        <vk-breadcrumb-item label="Blog" path="/blog" />
        <vk-breadcrumb-item label="Category" path="/blog/category" />
        <vk-breadcrumb-item label="Post" path="/blog/category/post" disabled />
      </vk-breadcrumb>
    </div>
    <vk-tabs
      :activeTab="activeTab"
      @change="tab => { activeTab = tab }">
      <vk-tab label="Props">
        <vk-docs-props
          :props="props"
          @change="(prop, value) => { props[prop].demo.value = value }">
        </vk-docs-props>
      </vk-tab>
      <vk-tab label="Item Props">
        <vk-docs-props :props="itemProps" />
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
import Breadcrumb from 'lib/Breadcrumb/Breadcrumb'
import BreadcrumbItem from 'lib/Breadcrumb/Item'
import mixin from './_mixin'
import { mergeProps } from 'helpers/pages'

export default {
  name: 'PageBreadcrumb',
  mixins: [mixin],
  data: () => ({
    activeTab: 1,
    props: mergeProps(Breadcrumb.props, props),
    itemProps: mergeProps(BreadcrumbItem.props, itemProps),
    slots,
    events,
    example
  })
}

const props = {
  location: {
    description: 'The current location.',
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

const itemProps = {
  label: {
    description: 'Title of the crumb. As alternative default Slot is supported.'
  },
  path: {
    description: `The crumb absolute path value.`
  },
  disabled: {
    description: 'Whether to display the crumb as disabled.'
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
`<vk-breadcrumb :location="location"
  @change="newLocation => { location = newLocation }">
  <vk-breadcrumb-item label="Home" path="/" />
  <vk-breadcrumb-item label="Blog" path="/blog" />
  <vk-breadcrumb-item label="Category" path="/blog/category" />
  <vk-breadcrumb-item label="Post" path="/blog/category/post" disabled />
</vk-breadcrumb>`
</script>
