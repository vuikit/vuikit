import Vue from 'vue/dist/vue.js'
import VkUpload from '../../src/lib/Upload'

Vue.component('VkUpload', VkUpload)

describe('VkUpload', () => {
  let $vm, spy

  beforeEach(() => {
    spy = jasmine.createSpy()
    $vm = new Vue({
      data: {
        message: ''
      },
      methods: {
        spy
      },
      template: `<vk-upload
        @dropped="spy()"
        @selected="spy()">
        <i class="uk-icon-cloud-upload uk-icon-medium uk-text-muted uk-margin-small-right"></i>
        Attach binaries by dropping them here or
        <a class="uk-form-file">
          selecting one<input type="file">
        </a>.
      </vk-upload>`
    }).$mount()
    document.body.appendChild($vm.$el)
  })

  afterEach(() => {
    document.body.removeChild($vm.$el)
  })

  it('should execute dropped on drop event', done => {
    waitForUpdate(() => {
      expect(spy).not.toHaveBeenCalled()
      triggerEvent($vm.$el, 'drop', function (e) {
        e.dataTransfer = {
          files: {
            name: 'test.JPG'
          }
        }
      })
    }).then(() => {
      expect(spy).toHaveBeenCalled()
    }).then(done)
  })
})
