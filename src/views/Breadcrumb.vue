<template>
  <div class="uk-block">
    <h2>Breadcrumb</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-breadcrumb v-ref:demo
      :location.sync="props.location.demo.value">
      <vk-crumb path="/">Home</vk-crumb>
      <vk-crumb path="/blog">Blog</vk-crumb>
      <vk-crumb disabled path="/blog/category">Category</vk-crumb>
      <vk-crumb path="/blog/category/post">Post</vk-crumb>
    </vk-breadcrumb>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-breadcrumb</code> component together with <code>vk-crumb</code> renders a breadcrumb showing any kind of location.
    </div>
    <!-- TABS -->
    <vk-tabs>
      <vk-tab label="Props">
        <vk-subnav line v-ref:nav>
          <vk-subnav-item>vk-breadcrumb</vk-subnav-item>
          <vk-subnav-item>vk-crumb</vk-subnav-item>
        </vk-subnav>
        <vk-switcher :connect="$refs.nav">
          <vk-switch>
            <vk-docs-props :props="props"></vk-docs-props>
          </vk-switch>
          <vk-switch>
            <vk-docs-props :props="propsCrumb"></vk-docs-props>
          </vk-switch>
        </vk-switcher>
      </vk-tab>
      <vk-tab label="Events">
        <vk-docs-events
          :events="events"
          :connect="$refs.demo">
        </vk-docs-events>
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code :code="code"></vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import { merge, pick } from 'lodash'
import Breadcrumb from '../lib/Breadcrumb'
import Crumb from '../lib/BreadcrumbItem'
import mixin from './_mixin'

export default {
  mixins: [mixin],
  data: () => ({
    props: merge(props, pick(Breadcrumb.props, Object.keys(props))),
    propsCrumb: merge(propsCrumb, pick(Crumb.props, Object.keys(propsCrumb))),
    events,
    slotsBreadcrumb,
    slotsCrumb,
    example
  })
}

const props = {
  location: {
    description: 'The currently active path. Defaults to last crumb path if omited.',
    demo: {
      options: {
        'Home': '/',
        'Blog': '/blog',
        'Post': '/blog/category/post'
      }
    }
  }
}

const propsCrumb = {
  path: {
    description: 'The full path of the crumb. Is a <code>required</code> value.'
  },
  disabled: {
    description: 'Wheter the crumb path can be selected.'
  }
}

const slotsBreadcrumb = {
  default: {
    description: 'The list of <code>vk-crumb</code> components.'
  }
}

const slotsCrumb = {
  default: {
    description: 'The title of the crumb.'
  }
}

const events = {
  change: {
    description: 'Emited on path selection.'
  }
}

const example =
`<vk-breadcrumb {attrs}>
  <vk-crumb path="/">Home</vk-crumb>
  <vk-crumb path="/blog">Blog</vk-crumb>
  <vk-crumb path="/blog/category">Category</vk-crumb>
  <vk-crumb path="/blog/category/post">Post</vk-crumb>
</vk-breadcrumb>`
</script>
