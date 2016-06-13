<template>
  <docs-page
    component="breadcrumb"
    :code-slot="codeSlot"
    :slots="true"
    :events="events">
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
      <vk-subnav line v-ref:nav>
        <vk-subnav-item>vk-breadcrumb</vk-subnav-item>
        <vk-subnav-item>vk-crumb</vk-subnav-item>
      </vk-subnav>
      <vk-switcher :connect="$refs.nav">
        <vk-switch>
          <table-props :rows="props"></table-props>
        </vk-switch>
        <vk-switch>
          <table-props :rows="propsCrumb" :demo="false"></table-props>
        </vk-switch>
      </vk-switcher>
    </div>
    <div slot="slots">
      <vk-subnav line v-ref:slots-nav>
        <vk-subnav-item>vk-breadcrumb</vk-subnav-item>
        <vk-subnav-item>vk-crumb</vk-subnav-item>
      </vk-subnav>
      <vk-switcher :connect="$refs.slotsNav">
        <vk-switch>
          <table-slots :rows="slotsBreadcrumb"></table-slots>
        </vk-switch>
        <vk-switch>
          <table-slots :rows="slotsCrumb"></table-slots>
        </vk-switch>
      </vk-switcher>
    </div>
  </docs-page>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  data: () => ({
    props: Helper.getProps('Breadcrumb', props),
    propsCrumb: Helper.getProps('Crumb', propsCrumb),
    events,
    codeSlot,
    slotsBreadcrumb,
    slotsCrumb
  })
}

const codeSlot =
`<vk-crumb path="/">Home</vk-crumb>
<vk-crumb path="/blog">Blog</vk-crumb>
<vk-crumb path="/blog/category">Category</vk-crumb>
<vk-crumb path="/blog/category/post">Post</vk-crumb>`

const props = {
  location: {
    description: 'The currently active path. Defaults to last crumb path if omited.',
    options: {
      'Home': '/',
      'Blog': '/blog',
      'Post': '/blog/category/post'
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
</script>
