<template>
  <div class="uk-padding">

    <h1>Scroll</h1>

    <vk-button-link href="#bottom" v-vk-scroll>
      Go Down!
    </vk-button-link>

    <vk-button-link @scrolled="scrolled" href="#bottom" v-vk-scroll>
      Go Down with callback
    </vk-button-link>

    <span v-vk-scroll>
      <vk-button-link href="#bottom" v-vk-scroll>
        Anchor as child
      </vk-button-link>
    </span>

    <div style="height: 2000px;"></div>

    <vk-button-link id="bottom" href="#" v-vk-scroll="{ duration: 2000, offset: -300 }">
      Go Up Slowely With Offset
    </vk-button-link>

  </div>
</template>

<script>
export default {
  methods: {
    scrolled () {
      alert('Done')
    }
  }
}
</script>
