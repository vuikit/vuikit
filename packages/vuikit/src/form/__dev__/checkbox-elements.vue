<template>
  <div class="uk-padding">

    <label><vk-checkbox-el/> A</label>
    <label><vk-checkbox-el checked/> B</label>
    <label><vk-checkbox-el disabled/> Disabled</label>

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
