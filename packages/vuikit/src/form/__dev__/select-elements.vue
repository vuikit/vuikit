<template>
  <div class="uk-padding">

    <div class="uk-margin">
      <vk-select-el>
        <option>Option 01</option>
        <option>Option 02</option>
      </vk-select-el>
    </div>

    <h2>States</h2>
    <div class="uk-margin">
      <vk-select-el vk-state="success">
        <option>Option 01</option>
        <option>Option 02</option>
      </vk-select-el>
    </div>
    <div class="uk-margin">
      <vk-select-el vk-state="danger">
        <option>Option 01</option>
        <option>Option 02</option>
      </vk-select-el>
    </div>
    <div class="uk-margin">
      <vk-select-el disabled>
        <option>Option 01</option>
        <option>Option 02</option>
      </vk-select-el>
    </div>
    <div class="uk-margin">
      <vk-select-el vk-blank>
        <option>Option 01</option>
        <option>Option 02</option>
      </vk-select-el>
    </div>

    <h2>Size</h2>
    <div class="uk-margin">
      <vk-select-el vk-size="large">
        <option>Option 01</option>
        <option>Option 02</option>
      </vk-select-el>
    </div>
    <div class="uk-margin">
      <vk-select-el>
        <option>Option 01</option>
        <option>Option 02</option>
      </vk-select-el>
    </div>
    <div class="uk-margin">
      <vk-select-el vk-size="small">
        <option>Option 01</option>
        <option>Option 02</option>
      </vk-select-el>
    </div>

    <h2>Width</h2>
    <div class="uk-margin">
      <vk-select-el vk-width="large">
        <option>Option 01</option>
        <option>Option 02</option>
      </vk-select-el>
    </div>
    <div class="uk-margin">
      <vk-select-el vk-width="medium">
        <option>Option 01</option>
        <option>Option 02</option>
      </vk-select-el>
    </div>
    <div class="uk-margin">
      <vk-select-el vk-width="small">
        <option>Option 01</option>
        <option>Option 02</option>
      </vk-select-el>
    </div>
    <div class="uk-margin">
      <vk-select-el vk-width="xsmall">
        <option>Option 01</option>
        <option>Option 02</option>
      </vk-select-el>
    </div>

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
