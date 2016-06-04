<template>
  <div>
    <docs-page
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
        The <code>vk-breadcrumb</code> component together with <code>vk-crumb</code> renders a breadcrumb showing any kind of location.
      </div>
      <div slot="props">
        <vk-subnav style="line" v-ref:nav>
          <vk-subnav-item>vk-breadcrumb</vk-subnav-item>
          <vk-subnav-item>vk-crumb</vk-subnav-item>
        </vk-subnav>
        <vk-switcher :connect="$refs.nav">
          <vk-switch>
            <table-props :rows="props"></table-props>
          </vk-switch>
          <vk-switch>
            <table-props :rows="CrumbProps" :demo="false"></table-props>
          </vk-switch>
        </vk-switcher>
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
    CrumbProps: Helper.getProps('Crumb', CrumbProps),
    events,
    code
  })
}

const code =
`<vk-breadcrumb>
  <vk-crumb path="/">Home</vk-crumb>
  <vk-crumb path="/blog">Blog</vk-crumb>
  <vk-crumb path="/blog/category">Category</vk-crumb>
  <vk-crumb path="/blog/category/post">Post</vk-crumb>
</vk-breadcrumb>`

const props = {
  location: {
    description: 'Determines the active location path. Defaults to last crumb path if omited.',
    options: {
      'Home': '/',
      'Blog': '/blog',
      'Post': '/blog/category/post'
    }
  }
}

const CrumbProps = {
  path: {
    description: 'Determines the crumb full path.'
  },
  disabled: {
    description: 'Determines the crumb disabled state.'
  }
}

const events = {
  change: {
    description: 'Emited on path selection.'
  }
}
</script>
