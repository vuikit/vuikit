<template>
  <vk-docs-layout-page>
    <div class="uk-block">
      <h2>Breadcrumb</h2>
      <hr class="uk-article-divider">
      <!-- DEMO -->
      <vk-breadcrumb
        :location="props.location.demo.value"
        :crumbs="{
          '/': {
            name: 'Home'
          },
          '/blog': {
            name: 'Home'
          },
          '/blog/category': {
            name: 'Category',
            disabled: true
          },
          '/blog/category/post': {
            name: 'Post'
          }
        }"
        @change="
          events.change.emited = true,
          props.location.demo.value = arguments[0]
        ">
      </vk-breadcrumb>
      <!-- DESC -->
      <div class="uk-margin-large">
        The <code>vk-breadcrumb</code> component renders a breadcrumb from an <code>Object</code> paths definition.
      </div>
      <!-- TABS -->
      <vk-tabs>
        <vk-tab label="Props">
          <vk-docs-props :props="props"></vk-docs-props>
        </vk-tab>
        <vk-tab label="Events">
          <vk-docs-events
            :events="events">
          </vk-docs-events>
        </vk-tab>
        <vk-tab label="Example">
          <vk-docs-code :code="code"></vk-docs-code>
        </vk-tab>
      </vk-tabs>
    </div>
  </vk-docs-layout-page>
</template>

<script>
import { merge, pick } from 'lodash'
import Breadcrumb from '../lib/Breadcrumb'
import mixin from './_mixin'

export default {
  name: 'PageBreadcrumb',
  mixins: [mixin],
  data: () => ({
    props: merge(props, pick(Breadcrumb.props, Object.keys(props))),
    slots,
    events,
    example
  })
}

const props = {
  location: {
    description: 'The currently active path.',
    demo: {
      options: {
        'Home': '/',
        'Blog': '/blog',
        'Post': '/blog/category/post'
      },
      value: '/'
    }
  }
}

const slots = {
  default: {
    description: 'The list of <code>vk-crumb</code> components.'
  }
}

const events = {
  change: {
    description: 'Emited on path selection.',
    emited: false
  }
}

const example =
`<vk-breadcrumb {attrs}
  :crumbs="{
    '/': {
      name: 'Home'
    },
    '/blog': {
      name: 'Home'
    },
    '/blog/category': {
      name: 'Category',
      disabled: true
    },
    '/blog/category/post': {
      name: 'Post'
    }
  }">
</vk-breadcrumb>`
</script>
