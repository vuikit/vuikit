import 'vuikit/dev-env'
import { createLocalVue, mount } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'

import Test from '../__dev__/default.vue'
import Panel from '../__dev__/_panel'

const localVue = createLocalVue()

localVue.component('Panel', Panel)

describe('VkGrid', () => {

  it('matches snapshot', async () => {
    const renderer = createRenderer()
    const wrapper = mount(Test, {
      localVue
    })

    const str = await renderer.renderToString(wrapper.vm)
    expect(str).toMatchSnapshot()
  })

})
