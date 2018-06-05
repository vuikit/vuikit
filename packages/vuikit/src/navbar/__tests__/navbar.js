import { mount } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'

import {
  Navbar,
  NavbarFull,
  ElNavbarNav,
  ElNavbarNavItem,
  ElNavbarItem,
  ElNavbarLogo,
  ElNavbarToggle
} from '../'

describe('VkNavbar', () => {

  it('matches snapshots', async () => {
    expect(await render(Navbar)).toMatchSnapshot()
    expect(await render(NavbarFull)).toMatchSnapshot()
  })

  it('elements match snapshots', async () => {
    expect(await render(ElNavbarNav)).toMatchSnapshot()
    expect(await render(ElNavbarItem)).toMatchSnapshot()
    expect(await render(ElNavbarLogo)).toMatchSnapshot()
    expect(await render(ElNavbarToggle, {
      context: {
        props: {
          title: 'Title'
        }
      }
    })).toMatchSnapshot()
    expect(await render(ElNavbarNavItem, {
      context: {
        props: {
          active: true,
          title: 'Title',
          subtitle: 'Subtitle'
        }
      }
    })).toMatchSnapshot()
  })

})

function render (component, opts) {
  const renderer = createRenderer()
  const wrapper = mount(component, opts)

  return renderer.renderToString(wrapper.vm)
}
