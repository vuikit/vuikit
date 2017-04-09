<template>
  <layouts-default>
    <h1>Modal</h1>
    Display modal dialogs.
    <hr class="uk-article-divider">
    <div class="uk-margin">
      <!-- DEMO -->
      <vk-button
        @click="props.show.demo.value = true">
        Open
      </vk-button>
      <vk-modal
        :show="props.show.demo.value"
        :center="props.center.demo.value"
        :large="props.large.demo.value"
        :lightbox="props.lightbox.demo.value"
        :blank="props.blank.demo.value"
        @clickOut="
          props.show.demo.value = false,
          events.clickOut.emited = true
        "
        @clickIn="events.clickIn.emited = true"
        @inactive="
          props.show.demo.value = false,
          events.inactive.emited = true
        "
        @keyEsc="
          props.show.demo.value = false,
          events.keyEsc.emited = true
        ">
        <!-- DEFAULT -->
        <template v-if="
          props.lightbox.demo.value === false &&
          props.blank.demo.value === false
        ">
          <a class="uk-close"
            @click="props.show.demo.value = false">
          </a>
          <div class="uk-modal-header">
            <h2>Headline</h2>
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <div class="uk-modal-footer">
            Footer
          </div>
          <div class="uk-modal-caption">Caption</div>
        </template>
        <!-- LIGHTBOX -->
        <template v-if="props.lightbox.demo.value">
          <a class="uk-close uk-close-alt"
            @click="props.show.demo.value = false">
          </a>
          <img src="./assets/placeholder_600x400.svg" class="uk-align-center">
        </template>
        <!-- BLANK -->
        <template v-if="props.blank.demo.value">
          <a class="uk-close uk-close-alt"
            @click="props.show.demo.value = false">
          </a>
          <div class="uk-grid uk-flex-middle" data-uk-grid-margin>
            <div class="uk-width-medium-1-2 uk-height-viewport uk-cover-background uk-row-first"
              :style="{'background-image': 'url(' + imageBlank + ')'}">
            </div>
            <div class="uk-width-medium-1-2">
              <h1>Headline</h1>
              <div class="uk-width-medium-1-3">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
            </div>
          </div>
        </template>
      </vk-modal>
    </div>
    <vk-tabs
      :activeTab="activeTab"
      @change="tab => { activeTab = tab }">
      <vk-tab label="Props">
        <vk-docs-props
          :props="props"
          @change="(prop, value) => props[prop].demo.value = value">
        </vk-docs-props>
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
import Component from 'lib/Modal'
import mixin from './_mixin'
import { mergeProps } from 'helpers/pages'

export default {
  mixins: [mixin],
  data: () => ({
    activeTab: 1,
    imageBlank: require('./assets/placeholder_600x400.svg'),
    props: mergeProps(Component.props, props),
    slots,
    events,
    example
  })
}

const props = {
  show: {
    description: 'Display state that when toggled will hide/show the modal.',
    demo: {
      value: false
    }
  },
  center: {
    type: Boolean,
    description: 'Whether to center the modal vertically.',
    demo: {
      value: false
    }
  },
  large: {
    description: 'Whether to set the modal width as large as the site\'s container width.',
    demo: {
      value: false
    }
  },
  lightbox: {
    description: 'Whether to display the modal as lightbox, better suited for showing images.',
    demo: {
      value: false
    }
  },
  blank: {
    description: 'Whether to display the modal with paddings and margins reseted, useful for displaying a fullscreen modal.',
    demo: {
      value: false
    }
  },
  transition: {
    description: `Specifies the transition name that will be used by the transition
      wrapper component.`
  }
}

const slots = {
  default: {
    description: `The modal main content. Check the <a href="http://getuikit.com/docs/modal.html">UIkit Modal</a>'
      documentation for all the possible content classes.`
  }
}

const events = {
  clickIn: {
    description: 'Emited when a click is performed inside the modal.',
    emited: false
  },
  clickOut: {
    description: 'Emited when a click is performed outside the modal while open.',
    emited: false
  },
  keyEsc: {
    description: 'Emited when the ESC key is pressed while the modal is opened.',
    emited: false
  },
  inactive: {
    description: 'Emited when a modal beecome inactive due to another modal opening.',
    emited: false
  }
}

const example =
`<vk-button
  @click"show = true">
  Open
</vk-button>
<vk-modal {attrs}
  :show="show"
  @clickOut="show = false"
  @inactive="show = false"
  @keyEsc="show = false">
  <a class="uk-close"
    @click="show = false">
  </a>
  <div class="uk-modal-header">
    <h2>Headline</h2>
  </div>
  <p>Lorem ipsum...</p>
  <div class="uk-modal-footer">
    Footer
  </div>
  <div class="uk-modal-caption">Caption</div>
</vk-modal>`
</script>
