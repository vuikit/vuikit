<template>
  <div class="uk-padding">

    <vk-input-el placeholder="input" value="value"/>

    <h2>States</h2>
    <div class="uk-margin">
      <vk-input-el value="success" vk-state="success"/>
    </div>
    <div class="uk-margin">
      <vk-input-el value="danger" vk-state="danger"/>
    </div>
    <div class="uk-margin">
      <vk-input-el value="disabled" disabled/>
    </div>
    <div class="uk-margin">
      <vk-input-el value="blank" vk-blank/>
    </div>

    <h2>Size</h2>
    <div class="uk-margin">
      <vk-input-el placeholder="Large" vk-size="large"/>
    </div>
    <div class="uk-margin">
      <vk-input-el placeholder="Default"/>
    </div>
    <div class="uk-margin">
      <vk-input-el placeholder="Small" vk-size="small"/>
    </div>

    <h2>Width</h2>
    <div class="uk-margin">
      <vk-input-el placeholder="Large" vk-width="large"/>
    </div>
    <div class="uk-margin">
      <vk-input-el placeholder="Medium" vk-width="medium"/>
    </div>
    <div class="uk-margin">
      <vk-input-el placeholder="Small" vk-width="small"/>
    </div>
    <div class="uk-margin">
      <vk-input-el placeholder="XSmall" vk-width="xsmall"/>
    </div>

    <h2>HTML Types</h2>
    <vk-input-el type="number" placeholder="22" value="40"/>

    <h2>Icon</h2>
    <div class="uk-margin">
      <div class="uk-inline">
        <vk-form-el-icon><vk-icons-user/></vk-form-el-icon>
        <vk-input-el/>
      </div>
    </div>

    <div class="uk-margin">
      <div class="uk-inline">
        <vk-form-el-icon flipped><vk-icons-user/></vk-form-el-icon>
        <vk-input-el/>
      </div>
    </div>

    <h2>Icon Link</h2>
    <div class="uk-margin">
      <div class="uk-inline">
        <vk-form-el-icon-link><vk-icons-link/></vk-form-el-icon-link>
        <vk-input-el/>
      </div>
    </div>

    <div class="uk-margin">
      <div class="uk-inline">
        <vk-form-el-icon-link flipped><vk-icons-link/></vk-form-el-icon-link>
        <vk-input-el/>
      </div>
    </div>

  </div>
</template>

<script>
import * as elements from '../elements'

import VkIconsUser from '@vuikit/icons/lib/user'
import VkIconsLink from '@vuikit/icons/lib/link'

export default {
  components: {
    ...elements,
    VkIconsUser,
    VkIconsLink
  }
}
</script>
