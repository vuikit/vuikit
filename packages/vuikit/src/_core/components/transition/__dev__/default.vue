<template>
  <div class="uk-padding">

    <button @click="show = !show">Toggle</button>

    <hr />

    <div class="uk-grid uk-child-width-expand">

      <div>
        <transition name="fade">
          <div v-show="show">Vue Transition</div>
        </transition>
      </div>
      <div>
        <vk-transition name="fade">
          <div v-show="show">Vuikit Transition</div>
        </vk-transition>
      </div>

    </div>

    <hr />

  </div>
</template>

<script>
import { Transition } from '../'

export default {
  components: {
    VkTransition: Transition
  },
  data: () => ({
    show: true
  })
}
</script>

<style>
/* Vue Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
