<template>
  <div class="uk-padding">

    <vk-radio-el/><br/>
    <vk-radio-el label="Label"/><br/>
    <vk-radio-el checked label="Checked"/><br/>
    <vk-radio-el disabled label="Disabled"/>

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
