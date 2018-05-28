<template>
  <div class="uk-padding">

    <el-input placeholder="input" value="value"/>

    <h2>States</h2>
    <div class="uk-margin">
      <el-input value="success" vk-state="success"/>
    </div>
    <div class="uk-margin">
      <el-input value="danger" vk-state="danger"/>
    </div>
    <div class="uk-margin">
      <el-input value="disabled" disabled/>
    </div>
    <div class="uk-margin">
      <el-input value="blank" vk-blank/>
    </div>

    <h2>Size</h2>
    <div class="uk-margin">
      <el-input placeholder="Large" vk-size="large"/>
    </div>
    <div class="uk-margin">
      <el-input placeholder="Default"/>
    </div>
    <div class="uk-margin">
      <el-input placeholder="Small" vk-size="small"/>
    </div>

    <h2>Width</h2>
    <div class="uk-margin">
      <el-input placeholder="Large" vk-width="large"/>
    </div>
    <div class="uk-margin">
      <el-input placeholder="Medium" vk-width="medium"/>
    </div>
    <div class="uk-margin">
      <el-input placeholder="Small" vk-width="small"/>
    </div>
    <div class="uk-margin">
      <el-input placeholder="XSmall" vk-width="xsmall"/>
    </div>

    <h2>HTML Types</h2>
    <el-input type="number" placeholder="22" value="40"/>

    <h2>Icon</h2>
    <div class="uk-margin">
      <div class="uk-inline">
        <el-form-icon><vk-icons-user/></el-form-icon>
        <el-input/>
      </div>
    </div>

    <div class="uk-margin">
      <div class="uk-inline">
        <el-form-icon flipped><vk-icons-user/></el-form-icon>
        <el-input/>
      </div>
    </div>

    <h2>Icon Link</h2>
    <div class="uk-margin">
      <div class="uk-inline">
        <el-form-icon-link><vk-icons-link/></el-form-icon-link>
        <el-input/>
      </div>
    </div>

    <div class="uk-margin">
      <div class="uk-inline">
        <el-form-icon-link flipped><vk-icons-link/></el-form-icon-link>
        <el-input/>
      </div>
    </div>

  </div>
</template>

<script>
import * as elements from '../../elements'
import { assign } from 'vuikit/src/_core/utils/lang'

import VkIconsUser from '@vuikit/icons/user'
import VkIconsLink from '@vuikit/icons/link'

export default {
  components: assign({}, elements, {
    VkIconsUser, VkIconsLink
  })
}
</script>
