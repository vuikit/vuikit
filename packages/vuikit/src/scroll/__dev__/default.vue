<template>
  <div class="uk-padding">

    <h1>Scroll</h1>

    <p>
      <vk-button-link href="#bottom" v-vk-scroll>
        Go Down!
      </vk-button-link>

      <vk-button-link @afterScroll="scrolled" href="#bottom" v-vk-scroll>
        Go Down with callback
      </vk-button-link>
    </p>

    <h2>Match anchors</h2>

    <p v-vk-scroll>
      <span><a href="#bottom">Should be targeted</a></span> <br />
    </p>

    <div v-vk-scroll="'> div > a'">
      <div><a href="#bottom">Should be targeted</a></div> <br />
      <a href="#bottom">Should not be targeted</a>
    </div>

    <div style="height: 2000px;"></div>

    <vk-button-link id="bottom" href="#" v-vk-scroll>
      Go Up
    </vk-button-link>

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
