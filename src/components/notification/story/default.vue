<template>
  <div class="uk-padding">
    <vk-notification
      :notifications.sync="notifications"
    ></vk-notification>

    <vk-button
      @click="addNotification">
        Add Notification
    </vk-button>
  </div>
</template>

<script>
export default {
  data: () => ({
    notifications: [],
    message: 0
  }),
  methods: {
    addNotification () {
      this.message++

      this.notifications.push({
        message: `Message ${this.message}`,
        status: 'primary',
        timeout: 3000
      })
    }
  }
}
</script>
