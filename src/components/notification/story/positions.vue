<template>
  <div class="uk-padding">
    <div class="uk-section uk-text-center">
      <div class="uk-flex uk-flex-center uk-flex-middle uk-height-medium">

        <!-- Top -->
        <div class="uk-grid">
          <div class="uk-width-1-1">
            <div class="uk-button-group">
              <vk-button
                @click="top.left.push({
                  message: 'Top Left'
                })"
                v-text="'Top Left'"
              ></vk-button>
              <vk-button
                @click="top.center.push({
                  message: 'Top Center'
                })"
                v-text="'Top Center'"
              ></vk-button>
              <vk-button
                @click="top.right.push({
                  message: 'Top Right'
                })"
                v-text="'Top Right'"
              ></vk-button>
            </div>
          </div>
          <!-- Bottom -->
          <div class="uk-width-1-1">
            <div class="uk-button-group">
              <vk-button
                @click="bottom.left.push({
                  message: 'Bottom Left'
                })"
                v-text="'Bottom Left'"
              ></vk-button>
              <vk-button
                @click="bottom.center.push({
                  message: 'Bottom Center'
                })"
                v-text="'Bottom Center'"
              ></vk-button>
              <vk-button
                @click="bottom.right.push({
                  message: 'Bottom Right'
                })"
                v-text="'Bottom Right'"
              ></vk-button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Top -->
    <vk-notification
      position="top-left"
      :notifications.sync="top.left"
    ></vk-notification>
    <vk-notification
      position="top-center"
      :notifications.sync="top.center"
    ></vk-notification>
    <vk-notification
      position="top-right"
      :notifications.sync="top.right"
    ></vk-notification>
    <!-- Bottom -->
    <vk-notification
      position="bottom-left"
      :notifications.sync="bottom.left"
    ></vk-notification>
    <vk-notification
      position="bottom-center"
      :notifications.sync="bottom.center"
    ></vk-notification>
    <vk-notification
      position="bottom-right"
      :notifications.sync="bottom.right"
    ></vk-notification>
  </div>
</template>

<script>
export default {
  data: () => ({
    top: {
      left: [],
      center: [],
      right: []
    },
    bottom: {
      left: [],
      center: [],
      right: []
    }
  })
}
</script>
