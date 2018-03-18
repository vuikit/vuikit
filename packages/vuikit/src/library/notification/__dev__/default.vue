<template>
  <div class="uk-padding">

    <h1>Notification</h1>

    <vk-notification
      :messages.sync="topLeft"
      position="top-left"
    ></vk-notification>
    <vk-notification
      :messages.sync="topCenter"
      position="top-center"
    ></vk-notification>
    <vk-notification
      :messages.sync="topRight"
      position="top-right"
    ></vk-notification>
    <vk-notification
      :messages.sync="bottomLeft"
      position="bottom-left"
    ></vk-notification>
    <vk-notification
      :messages.sync="bottomCenter"
      position="bottom-center"
    ></vk-notification>
    <vk-notification
      :messages.sync="bottomRight"
      position="bottom-right"
    ></vk-notification>

    <vk-notification
      :messages.sync="styles"
    ></vk-notification>

    <vk-notification
      :messages.sync="primary"
      status="primary"
      position="top-left"
    ></vk-notification>
    <vk-notification
      :messages.sync="success"
      status="success"
      position="top-right"
    ></vk-notification>
    <vk-notification
      :messages.sync="warning"
      status="warning"
      position="bottom-left"
    ></vk-notification>
    <vk-notification
      :messages.sync="danger"
      status="danger"
      position="bottom-right"
    ></vk-notification>

    <vk-notification
      :messages.sync="specials"
    ></vk-notification>

    <vk-notification
      :messages.sync="slot"
    >
      <div slot-scope="{ message }" class="uk-text-center">
        <strong>Hei</strong>, I'm using a scoped slot with {{ message }}!
      </div>
    </vk-notification>

    <p v-vk-margin>
      <vk-button @click="topLeft.push('Message')">
        Top Left
      </vk-button>
      <vk-button @click="topCenter.push('Message')">
        Top Center
      </vk-button>
      <vk-button @click="topRight.push('Message')">
        Top Right
      </vk-button>
    </p>

    <p v-vk-margin>
      <vk-button @click="bottomLeft.push('Message')">
        Bottom Left
      </vk-button>
      <vk-button @click="bottomCenter.push('Message')">
        Bottom Center
      </vk-button>
      <vk-button @click="bottomRight.push('Message')">
        Bottom Right
      </vk-button>
    </p>

    <h2>Styles</h2>

    <p v-vk-margin>
      <vk-button @click="styles.push({ message: 'Message', status: 'primary' })">
        Primary
      </vk-button>
      <vk-button @click="styles.push({ message: 'Message', status: 'success' })">
        Success
      </vk-button>
      <vk-button @click="styles.push({ message: 'Message', status: 'warning' })">
        Warning
      </vk-button>
      <vk-button @click="styles.push({ message: 'Message', status: 'danger' })">
        Danger
      </vk-button>
    </p>

    <h2>Styles Container</h2>

    <p v-vk-margin>
      <vk-button @click="primary.push({ message: 'Message' })">
        Primary
      </vk-button>
      <vk-button @click="success.push({ message: 'Message' })">
        Success
      </vk-button>
      <vk-button @click="warning.push({ message: 'Message' })">
        Warning
      </vk-button>
      <vk-button @click="danger.push({ message: 'Message' })">
        Danger
      </vk-button>
    </p>

    <h2>Specials</h2>

    <p v-vk-margin>
      <vk-button @click="specials.push({ message: 'Message without timeout', timeout: 0 })">
        No Timeout
      </vk-button>
      <vk-button @click="pushMessage('specials', 'With unique key')">
        Unique key
      </vk-button>
      <vk-button @click="slot.push({ message: 'My Message' })">
        With a Slot
      </vk-button>
    </p>

  </div>
</template>

<script>
import { assign } from 'vuikit/src/util/lang'

let count = 0

export default {
  data: () => ({
    topLeft: [],
    topCenter: [],
    topRight: [],
    bottomLeft: [],
    bottomCenter: [],
    bottomRight: [],
    styles: [],
    primary: [],
    success: [],
    warning: [],
    danger: [],
    specials: [],
    slot: []
  }),
  methods: {
    pushMessage (container, message) {
      count++
      this[container].push(assign({ message }, { key: count }))
    }
  }
}
</script>
