<template>
  <div class="uk-padding">

    <h2>Form Stacked</h2>
    <vk-form-stacked>

      <div class="uk-margin">
        <vk-form-label for="form-stacked-text">Text</vk-form-label>
        <vk-form-controls>
          <vk-input id="form-stacked-text" placeholder="Some text..."/>
        </vk-form-controls>
      </div>

      <div class="uk-margin">
        <vk-form-label for="form-stacked-select">Select</vk-form-label>
        <vk-form-controls>
          <vk-select id="form-stacked-select">
            <option>Option 01</option>
            <option>Option 02</option>
          </vk-select>
        </vk-form-controls>
      </div>

      <div class="uk-margin">
        <vk-form-label>Radio</vk-form-label>
        <vk-form-controls>
          <vk-radio name="radio1" label="Option 01"/><br>
          <vk-radio name="radio1" label="Option 02"/>
        </vk-form-controls>
      </div>

    </vk-form-stacked>

    <h2>Form Horizontal</h2>
    <vk-form-horizontal>

      <div class="uk-margin">
        <vk-form-label for="form-horizontal-text">Text</vk-form-label>
        <div class="uk-form-controls">
            <input class="uk-input" id="form-horizontal-text" type="text" placeholder="Some text...">
        </div>
      </div>

      <div class="uk-margin">
        <vk-form-label for="form-horizontal-select">Select</vk-form-label>
        <vk-form-controls>
            <vk-select id="form-horizontal-select">
              <option>Option 01</option>
              <option>Option 02</option>
            </vk-select>
        </vk-form-controls>
      </div>

      <div class="uk-margin">
        <vk-form-label>Radio</vk-form-label>
        <vk-form-controls text>
          <vk-radio name="radio1" label="Option 01"/><br>
          <vk-radio name="radio1" label="Option 02"/>
        </vk-form-controls>
      </div>

    </vk-form-horizontal>

  </div>
</template>

<script>
export default {
}
</script>
