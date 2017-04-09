<template>
  <div class="uk-container uk-margin-bottom">
    <app-header></app-header>
    <h1>{{ $route.name }}</h1>
    <h2>Bar</h2>
    <div class="uk-margin">
      <vk-loading-bar :progress="progress" :state="state" @animation-complete="update"></vk-loading-bar>
    </div>
    <vk-button @click="progress += 30">Sum 30</vk-button>
    <vk-button @click="progress = 100; state = ''">Complete</vk-button>
    <vk-button @click="progress = 100; state = 'timeout'">Timeout</vk-button>
    <vk-button @click="progress = 100; state = 'error'">Error</vk-button>
    <vk-button @click="reset">Reset</vk-button>
  </div>
</template>

<script>
export default {
  data: () => ({
    progress: 30,
    state: ''
  }),
  methods: {
    update (progress) {
      if (progress === 100) {
        this.reset()
      }
    },
    reset () {
      this.progress = 0
      this.state = ''
    }
  }
}
</script>
