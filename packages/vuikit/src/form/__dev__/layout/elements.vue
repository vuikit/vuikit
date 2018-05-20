<template>
  <div class="uk-padding">

    <h2>Form Stacked</h2>
    <el-form-stacked>

      <div class="uk-margin">
        <el-form-label for="form-stacked-text">Text</el-form-label>
        <el-form-controls>
          <el-input id="form-stacked-text" placeholder="Some text..."/>
        </el-form-controls>
      </div>

      <div class="uk-margin">
        <el-form-label for="form-stacked-select">Select</el-form-label>
        <el-form-controls>
          <el-select id="form-stacked-select">
            <option>Option 01</option>
            <option>Option 02</option>
          </el-select>
        </el-form-controls>
      </div>

      <div class="uk-margin">
        <el-form-label>Radio</el-form-label>
        <el-form-controls>
          <label><el-radio name="radio1" /> Option 1</label><br>
          <label><el-radio name="radio1" /> Option 2</label>
        </el-form-controls>
      </div>

    </el-form-stacked>

    <h2>Form Horizontal</h2>
    <el-form-horizontal>

      <div class="uk-margin">
        <el-form-label for="form-horizontal-text">Text</el-form-label>
        <div class="uk-form-controls">
            <input class="uk-input" id="form-horizontal-text" type="text" placeholder="Some text...">
        </div>
      </div>

      <div class="uk-margin">
        <el-form-label for="form-horizontal-select">Select</el-form-label>
        <el-form-controls>
            <el-select id="form-horizontal-select">
              <option>Option 01</option>
              <option>Option 02</option>
            </el-select>
        </el-form-controls>
      </div>

      <div class="uk-margin">
        <el-form-label>Radio</el-form-label>
        <el-form-controls text>
          <label><el-radio name="radio1" /> Option 1</label><br>
          <label><el-radio name="radio1" /> Option 2</label>
        </el-form-controls>
      </div>

    </el-form-horizontal>

  </div>
</template>

<script>
import * as components from '../../elements'

export default {
  components
}
</script>
