import { mount } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'

import 'vuikit/dev-env'

import {
  Navbar,
  NavbarFull,
  ElementNavbarNav,
  ElementNavbarNavItem,
  ElementNavbarItem,
  ElementNavbarLogo,
  ElementNavbarToggle
} from '../'

describe('VkNavbar', () => {

  it('matches snapshots', async () => {
    expect(await render(Navbar)).toMatchSnapshot()
    expect(await render(NavbarFull)).toMatchSnapshot()
  })

  it('elements match snapshots', async () => {
    expect(await render(ElementNavbarNav)).toMatchSnapshot()
    expect(await render(ElementNavbarItem)).toMatchSnapshot()
    expect(await render(ElementNavbarLogo)).toMatchSnapshot()
    expect(await render(ElementNavbarToggle, {
      context: {
        props: {
          title: 'Title'
        }
      }
    })).toMatchSnapshot()
    expect(await render(ElementNavbarNavItem, {
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
