<template>
  <div class="uk-padding">

    <h2>Form Stacked</h2>
    <vk-form-el-stacked>

      <div class="uk-margin">
        <vk-form-el-label for="form-stacked-text">Text</vk-form-el-label>
        <vk-form-el-controls>
          <vk-input-el id="form-stacked-text" placeholder="Some text..."/>
        </vk-form-el-controls>
      </div>

      <div class="uk-margin">
        <vk-form-el-label for="form-stacked-select">Select</vk-form-el-label>
        <vk-form-el-controls>
          <vk-select-el id="form-stacked-select">
            <option>Option 01</option>
            <option>Option 02</option>
          </vk-select-el>
        </vk-form-el-controls>
      </div>

      <div class="uk-margin">
        <vk-form-el-label>Radio</vk-form-el-label>
        <vk-form-el-controls>
          <label><vk-radio-el name="radio1" /> Option 1</label><br>
          <label><vk-radio-el name="radio1" /> Option 2</label>
        </vk-form-el-controls>
      </div>

    </vk-form-el-stacked>

    <h2>Form Horizontal</h2>
    <vk-form-el-horizontal>

      <div class="uk-margin">
        <vk-form-el-label for="form-horizontal-text">Text</vk-form-el-label>
        <div class="uk-form-controls">
            <input class="uk-input" id="form-horizontal-text" type="text" placeholder="Some text...">
        </div>
      </div>

      <div class="uk-margin">
        <vk-form-el-label for="form-horizontal-select">Select</vk-form-el-label>
        <vk-form-el-controls>
            <vk-select-el id="form-horizontal-select">
              <option>Option 01</option>
              <option>Option 02</option>
            </vk-select-el>
        </vk-form-el-controls>
      </div>

      <div class="uk-margin">
        <vk-form-el-label>Radio</vk-form-el-label>
        <vk-form-el-controls text>
          <label><vk-radio-el name="radio1" /> Option 1</label><br>
          <label><vk-radio-el name="radio1" /> Option 2</label>
        </vk-form-el-controls>
      </div>

    </vk-form-el-horizontal>

  </div>
</template>

<script>
import * as elements from '../elements'

export default {
  components: {
    ...elements
  }
}
</script>
