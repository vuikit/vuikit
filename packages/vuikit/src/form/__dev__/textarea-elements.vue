<template>
  <div class="uk-padding">

    <div class="uk-margin">
      <vk-textarea-el v-text="'value'"/>
    </div>
    <div class="uk-margin">
      <vk-textarea-el placeholder="placeholder"/>
    </div>

    <h2>States</h2>
    <div class="uk-margin">
      <vk-textarea-el placeholder="success" vk-state="success"/>
    </div>
    <div class="uk-margin">
      <vk-textarea-el placeholder="danger" vk-state="danger"/>
    </div>
    <div class="uk-margin">
      <vk-textarea-el placeholder="disabled" disabled/>
    </div>
    <div class="uk-margin">
      <vk-textarea-el placeholder="vk-blank" vk-blank/>
    </div>

    <h2>Size</h2>
    <div class="uk-margin">
      <vk-textarea-el placeholder="Large" vk-size="large"/>
    </div>
    <div class="uk-margin">
      <vk-textarea-el placeholder="Default"/>
    </div>
    <div class="uk-margin">
      <vk-textarea-el placeholder="Small" vk-size="small"/>
    </div>

    <h2>Width</h2>
    <div class="uk-margin">
      <vk-textarea-el placeholder="Large" vk-width="large"/>
    </div>
    <div class="uk-margin">
      <vk-textarea-el placeholder="Medium" vk-width="medium"/>
    </div>
    <div class="uk-margin">
      <vk-textarea-el placeholder="Small" vk-width="small"/>
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
