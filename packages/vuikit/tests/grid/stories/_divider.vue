<template functional>
  <div>

    <vk-grid :gutter="props.gutter" divided class="uk-child-width-1-2">
      <div><panel>1-2</panel></div>
      <div><panel>1-2</panel></div>
    </vk-grid>

    <vk-grid :gutter="props.gutter" divided matched class="uk-child-width-1-2@m">
      <div><panel>1-2-M</panel></div>
      <div>
        <vk-grid :gutter="props.gutter" divided class="uk-child-width-1-2@l">
          <div><panel>1-2-L</panel></div>
          <div><panel>1-2-L</panel></div>
        </vk-grid>
      </div>
    </vk-grid>

    <vk-grid :gutter="props.gutter" divided matched class="uk-child-width-1-4@m">
      <div><panel>1-4-M<br>..<br>...</panel></div>
      <div><panel>1-4-M</panel></div>
      <div class="uk-width-1-2@m">
        <vk-grid :gutter="props.gutter" divided matched class="uk-child-width-1-2@l">
          <div><panel>1-2-L</br>..</panel></div>
          <div><panel>1-2-L</panel></div>
        </vk-grid>
      </div>
    </vk-grid>

    <vk-grid :gutter="props.gutter" divided matched class="uk-child-width-1-2@m">
      <div><panel>1-2-M</panel></div>
      <div>
        <panel>1-2-M</panel>
        <panel class="uk-margin-medium">1-2-M</panel>
      </div>
    </vk-grid>

    <vk-grid :gutter="props.gutter" divided>
      <div class="uk-width-1-2@m"><panel>1-2-M</panel></div>
      <div class="uk-width-1-4@m"><panel>1-4-M</panel></div>
      <div class="uk-width-1-4@m"><panel>1-4-M</panel></div>
      <div class="uk-width-1-5@m"><panel>1-5-M</panel></div>
      <div class="uk-width-1-5@m"><panel>1-5-M</panel></div>
      <div class="uk-width-3-5@m"><panel>3-5-M</panel></div>
    </vk-grid>

    <vk-grid :gutter="props.gutter" divided>
      <div class="uk-width-auto@m"><panel>Auto-M</panel></div>
      <div class="uk-width-1-3@m"><panel>1-3-M</panel></div>
      <div class="uk-width-expand@m"><panel>Expand-M</panel></div>
    </vk-grid>

  </div>
</template>

<script>
export default {
  functional: true,
  props: {
    gutter: {
      type: String,
      default: ''
    }
  }
}
</script>
