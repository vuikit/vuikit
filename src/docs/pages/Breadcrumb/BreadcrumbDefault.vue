<template>
  <div>
    <docs-page
      :props="props"
      :events="events"
      :code="code">
      <div slot="demo">
        <vk-breadcrumb v-ref:demo
          :location.sync="props.location.value">
          <vk-crumb path="/">Home</vk-crumb>
          <vk-crumb path="/blog">Blog</vk-crumb>
          <vk-crumb disabled path="/blog/category">Category</vk-crumb>
          <vk-crumb path="/blog/category/post">Post</vk-crumb>
        </vk-breadcrumb>
      </div>
      <div slot="desc">
        Create breadcrumbs to show users their location within a website.
      </div>
    </docs-page>
  </div>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  data: () => ({
    props: Helper.getProps('Breadcrumb', props),
    events,
    code
  })
}

const code =
`<vk-breadcrumb :crumbs="crumbs">
  <vk-crumb path="/">Home</vk-crumb>
  <vk-crumb path="/blog">Blog</vk-crumb>
  <vk-crumb path="/blog/category">Category</vk-crumb>
  <vk-crumb path="/blog/category/post">Post</vk-crumb>
</vk-breadcrumb>`

const props = {
  location: {
    description: 'Determines the current active location.',
    editable: false
  }
}

const events = {
  change: {
    description: 'Emited on page selection.'
  }
}
</script>
