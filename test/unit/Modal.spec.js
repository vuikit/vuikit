import Vue from 'vue/dist/vue.js'
import VkButton from '../../src/lib/Button'
import VkModal from '../../src/lib/Modal'

Vue.component('VkButton', VkButton)
Vue.component('VkModal', VkModal)

describe('VkModal', () => {
  let $vm

  beforeEach(() => {
    $vm = new Vue({
      data: {
        show: false,
        center: false,
        large: false,
        lightbox: false,
        blank: false,
        transition: false,
        clickInEmited: false,
        clickOutEmited: false,
        keyEscEmited: false,
        inactiveEmited: false
      },
      template: `<div class="uk-block"><vk-button
      @click.native="show = true">
      Open
    </vk-button>
    <vk-modal
      :show="show"
      :center="center"
      :large="large"
      :lightbox="lightbox"
      :blank="blank"
      @clickOut="
        show = false,
        clickOutEmited = true
      "
      @clickIn="clickInEmited = true"
      @inactive="
        show = false,
        inactiveEmited = true
      "
      @keyEsc="
        show = false,
        keyEscEmited = true
      "></vk-modal>
      </div>`
    }).$mount()
    document.body.appendChild($vm.$el)
  })

  afterEach(() => {
    document.body.removeChild($vm.$el)
  })

  it('should display modal on button click', done => {
    expect($vm.$el.querySelector('.uk-modal').style.display).toBe('none')
    $vm.$el.querySelector('button').click()
    waitForUpdate(() => {
      expect($vm.$el.querySelector('.uk-modal').style.display).toBe('')
    }).then(done)
  })

  it('should display modal on show prop toggle', done => {
    expect($vm.$el.querySelector('.uk-modal').style.display).toBe('none')
    $vm.show = true
    waitForUpdate(() => {
      expect($vm.$el.querySelector('.uk-modal').style.display).toBe('')
      $vm.show = false
    }).then(done)
  })

  it('should display modal as lightbox', done => {
    expect($vm.$el.querySelector('.uk-modal-dialog').classList.contains('uk-modal-dialog-lightbox')).toBeFalsy()
    $vm.lightbox = true
    waitForUpdate(() => {
      expect($vm.$el.querySelector('.uk-modal-dialog').classList.contains('uk-modal-dialog-lightbox')).toBeTruthy()
    }).then(done)
  })

  it('should display modal as blank', done => {
    expect($vm.$el.querySelector('.uk-modal-dialog').classList.contains('uk-modal-dialog-blank')).toBeFalsy()
    $vm.blank = true
    waitForUpdate(() => {
      expect($vm.$el.querySelector('.uk-modal-dialog').classList.contains('uk-modal-dialog-blank')).toBeTruthy()
    }).then(done)
  })

  it('should display modal as large', done => {
    expect($vm.$el.querySelector('.uk-modal-dialog').classList.contains('uk-modal-dialog-large')).toBeFalsy()
    $vm.large = true
    waitForUpdate(() => {
      expect($vm.$el.querySelector('.uk-modal-dialog').classList.contains('uk-modal-dialog-large')).toBeTruthy()
    }).then(done)
  })
})
