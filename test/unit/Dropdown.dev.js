import Vue from 'vue/dist/vue.js'
import VkButton from '../../src/lib/Button'
import VkDropdown from '../../src/lib/Dropdown'
Vue.component('VkButton', VkButton)
Vue.component('VkDropdown', VkDropdown)

describe('VkDropdown', () => {
  let $vm

  beforeEach(() => {
    $vm = new Vue({
      data: {
        show: false,
        position: false,
        offset: false,
        offsetTarget: false,
        constrainToWindow: false,
        constrainToParent: false,
        blank: false,
        fixWidth: false,
        scrollable: false,
        clickIn: false,
        clickOut: false,
        targetHoverIn: false,
        targetHoverOut: false
      },
      template: `<div><vk-button id="target"
        @click.native="show = !show">
        Toggle
        <i class="uk-icon-caret-down"></i>
      </vk-button>
      <vk-dropdown ref="dropdown"
        target="#target"
        :show="show"
        :position="position"
        :offset="offset"
        :offset-target="offsetTarget"
        :constrain-to-window="constrainToWindow"
        :constrain-to-parent="constrainToParent"
        :blank="blank"
        :fix-width="fixWidth"
        :scrollable="scrollable"
        @clickIn="clickIn = true"
        @clickOut="
          show = false,
          clickOut = true
        "
        @targetHoverIn="targetHoverIn = true"
        @targetHoverOut="targetHoverOut = true">
        <ul class="uk-nav uk-nav-dropdown">
          <li><a href="#" @click.prevent>Item</a></li>
          <li><a href="#" @click.prevent>Another item</a></li>
          <li class="uk-nav-header">Header</li>
          <li><a href="#" @click.prevent>Item</a></li>
          <li><a href="#" @click.prevent>Another item</a></li>
          <li class="uk-nav-divider"></li>
          <li><a href="#" @click.prevent>Separated item</a></li>
        </ul>
      </vk-dropdown></div>`
    }).$mount()
    document.body.appendChild($vm.$el)
  })

  it('should work', done => {
    console.log($vm.$el)
    done()
  })
})

