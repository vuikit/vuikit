<template>
  <div class="uk-padding">

    <vk-button ref="btn">
      Show
    </vk-button>

    <vk-dropdown-nav
      :show.sync="show"
      target="btn"
    >
      <vk-nav-item-header label="Header" />
      <vk-nav-item icon="file" label="Item" />
      <vk-nav-item icon="file" label="Item" />
    </vk-dropdown-nav>

  </div>
</template>

<script>
import { DropdownNav as VkDropdownNav } from '../'
import { Button as VkButton } from '../../button'
import { NavItem as VkNavItem, NavItemHeader as VkNavItemHeader } from '../../nav'

export default {
  components: {
    VkButton,
    VkNavItem,
    VkNavItemHeader,
    VkDropdownNav
  },
  data: () => ({
    show: false
  })
}
</script>
