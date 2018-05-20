<template>
  <div class="uk-padding">

    <div class="uk-margin">
      <el-textarea v-text="'value'"/>
    </div>
    <div class="uk-margin">
      <el-textarea placeholder="placeholder"/>
    </div>

    <h2>States</h2>
    <div class="uk-margin">
      <el-textarea placeholder="success" vk-state="success"/>
    </div>
    <div class="uk-margin">
      <el-textarea placeholder="danger" vk-state="danger"/>
    </div>
    <div class="uk-margin">
      <el-textarea placeholder="disabled" disabled/>
    </div>
    <div class="uk-margin">
      <el-textarea placeholder="vk-blank" vk-blank/>
    </div>

    <h2>Size</h2>
    <div class="uk-margin">
      <el-textarea placeholder="Large" vk-size="large"/>
    </div>
    <div class="uk-margin">
      <el-textarea placeholder="Default"/>
    </div>
    <div class="uk-margin">
      <el-textarea placeholder="Small" vk-size="small"/>
    </div>

    <h2>Width</h2>
    <div class="uk-margin">
      <el-textarea placeholder="Large" vk-width="large"/>
    </div>
    <div class="uk-margin">
      <el-textarea placeholder="Medium" vk-width="medium"/>
    </div>
    <div class="uk-margin">
      <el-textarea placeholder="Small" vk-width="small"/>
    </div>

  </div>
</template>

<script>
import * as components from '../../elements'

export default {
  components
}
</script>
