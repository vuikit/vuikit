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
import { Button as VkButton } from '../../button'
import { Notification as VkNotification } from '../'

export default {
  components: {
    VkButton,
    VkNotification
  },
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
