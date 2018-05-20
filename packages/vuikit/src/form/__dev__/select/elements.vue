<template>
  <div class="uk-padding">

    <div class="uk-margin">
      <el-select>
        <option>Option 01</option>
        <option>Option 02</option>
      </el-select>
    </div>

    <h2>States</h2>
    <div class="uk-margin">
      <el-select vk-state="success">
        <option>Option 01</option>
        <option>Option 02</option>
      </el-select>
    </div>
    <div class="uk-margin">
      <el-select vk-state="danger">
        <option>Option 01</option>
        <option>Option 02</option>
      </el-select>
    </div>
    <div class="uk-margin">
      <el-select disabled>
        <option>Option 01</option>
        <option>Option 02</option>
      </el-select>
    </div>
    <div class="uk-margin">
      <el-select vk-blank>
        <option>Option 01</option>
        <option>Option 02</option>
      </el-select>
    </div>

    <h2>Size</h2>
    <div class="uk-margin">
      <el-select vk-size="large">
        <option>Option 01</option>
        <option>Option 02</option>
      </el-select>
    </div>
    <div class="uk-margin">
      <el-select>
        <option>Option 01</option>
        <option>Option 02</option>
      </el-select>
    </div>
    <div class="uk-margin">
      <el-select vk-size="small">
        <option>Option 01</option>
        <option>Option 02</option>
      </el-select>
    </div>

    <h2>Width</h2>
    <div class="uk-margin">
      <el-select vk-width="large">
        <option>Option 01</option>
        <option>Option 02</option>
      </el-select>
    </div>
    <div class="uk-margin">
      <el-select vk-width="medium">
        <option>Option 01</option>
        <option>Option 02</option>
      </el-select>
    </div>
    <div class="uk-margin">
      <el-select vk-width="small">
        <option>Option 01</option>
        <option>Option 02</option>
      </el-select>
    </div>
    <div class="uk-margin">
      <el-select vk-width="xsmall">
        <option>Option 01</option>
        <option>Option 02</option>
      </el-select>
    </div>

  </div>
</template>

<script>
import * as components from '../../elements'

export default {
  components
}
</script>
