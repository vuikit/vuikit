<template>
  <div class="uk-container uk-margin-bottom">
    <app-header></app-header>
    <h1>{{ $route.name }}</h1>
    <div class="uk-grid-small uk-child-width-expand@s" uk-grid>
      <div>
        <h2>Basic</h2>
        <div>
          <vk-button @click="messages.top.left.push({
            message: 'Message'
          })">
            Top Left
          </vk-button>
          <vk-button @click="messages.top.center.push({
            message: 'Message'
          })">
            Top Center
          </vk-button>
          <vk-button @click="messages.top.right.push({
            message: 'Message'
          })">
            Top Right
          </vk-button>
        </div>
        <div>
          <vk-button @click="messages.bottom.left.push({
            message: 'Message'
          })">
            Bottom Left
          </vk-button>
          <vk-button @click="messages.bottom.center.push({
            message: 'Message'
          })">
            Bottom Center
          </vk-button>
          <vk-button @click="messages.bottom.right.push({
            message: 'Message'
          })">
            Bottom Right
          </vk-button>
        </div>
      </div>

      <div>
        <h2>Styles</h2>
        <div>
          <vk-button @click="messages.top.center.push({
            message: 'Message',
            status: 'primary'
          })">
            Primary
          </vk-button>
          <vk-button @click="messages.top.center.push({
            message: 'Message',
            status: 'success'
          })">
            Success
          </vk-button>
          <vk-button @click="messages.top.center.push({
            message: 'Message',
            status: 'warning'
          })">
            Warning
          </vk-button>
          <vk-button @click="messages.top.center.push({
            message: 'Danger',
            status: 'danger'
          })">
            Danger
          </vk-button>
        </div>
      </div>
    </div>

    <vk-notification position="top-left"
      @timeout="message => {
        messages.top.left.splice(messages.top.left.indexOf(message), 1)
      }"
      @click="message => {
        messages.top.left.splice(messages.top.left.indexOf(message), 1)
      }">
      <vk-notification-message v-for="(msg, index) in messages.top.left" :key="index"
        :id="msg"
        :status="msg.status"
        :timeout="msg.timeout"
        :transition="msg.transition">
        <a href="#" class="uk-close" @click.prevent="id => {
          messages.top.left.splice(messages.top.left.indexOf(index), 1)
        }"></a>
        {{ msg.message }}
      </vk-notification-message>
    </vk-notification>

    <vk-notification position="top-center"
      @timeout="message => {
        messages.top.center.splice(messages.top.center.indexOf(message), 1)
      }"
      @click="message => {
        messages.top.center.splice(messages.top.center.indexOf(message), 1)
      }">
      <vk-notification-message v-for="(msg, index) in messages.top.center" :key="index"
        :id="msg"
        :status="msg.status"
        :timeout="msg.timeout"
        :transition="msg.transition">
        <a href="#" class="uk-close" @click.prevent="id => {
          messages.top.center.splice(messages.top.center.indexOf(index), 1)
        }"></a>
        {{ msg.message }}
      </vk-notification-message>
    </vk-notification>

    <vk-notification position="top-right"
      @timeout="message => {
        messages.top.right.splice(messages.top.right.indexOf(message), 1)
      }"
      @click="message => {
        messages.top.right.splice(messages.top.right.indexOf(message), 1)
      }">
      <vk-notification-message v-for="(msg, index) in messages.top.right" :key="index"
        :id="msg"
        :status="msg.status"
        :timeout="msg.timeout"
        :transition="msg.transition">
        <a href="#" class="uk-close" @click.prevent="id => {
          messages.top.right.splice(messages.top.right.indexOf(index), 1)
        }"></a>
        {{ msg.message }}
      </vk-notification-message>
    </vk-notification>

    <vk-notification position="bottom-left"
      @timeout="message => {
        messages.bottom.left.splice(messages.bottom.left.indexOf(message), 1)
      }"
      @click="message => {
        messages.bottom.left.splice(messages.bottom.left.indexOf(message), 1)
      }">
      <vk-notification-message v-for="(msg, index) in messages.bottom.left" :key="index"
        :id="msg"
        :status="msg.status"
        :timeout="msg.timeout"
        :transition="msg.transition">
        <a href="#" class="uk-close" @click.prevent="id => {
          messages.bottom.left.splice(messages.bottom.left.indexOf(index), 1)
        }"></a>
        {{ msg.message }}
      </vk-notification-message>
    </vk-notification>

    <vk-notification position="bottom-center"
      @timeout="message => {
        messages.bottom.center.splice(messages.bottom.center.indexOf(message), 1)
      }"
      @click="message => {
        messages.bottom.center.splice(messages.bottom.center.indexOf(message), 1)
      }">
      <vk-notification-message v-for="(msg, index) in messages.bottom.center" :key="index"
        :id="msg"
        :status="msg.status"
        :timeout="msg.timeout"
        :transition="msg.transition">
        <a href="#" class="uk-close" @click.prevent="id => {
          messages.bottom.center.splice(messages.bottom.center.indexOf(index), 1)
        }"></a>
        {{ msg.message }}
      </vk-notification-message>
    </vk-notification>

    <vk-notification position="bottom-right"
      @timeout="message => {
        messages.bottom.right.splice(messages.bottom.right.indexOf(message), 1)
      }"
      @click="message => {
        messages.bottom.right.splice(messages.bottom.right.indexOf(message), 1)
      }">
      <vk-notification-message v-for="(msg, index) in messages.bottom.right" :key="index"
        :id="msg"
        :status="msg.status"
        :timeout="msg.timeout"
        :transition="msg.transition">
        <a href="#" class="uk-close" @click.prevent="id => {
          messages.bottom.right.splice(messages.bottom.right.indexOf(index), 1)
        }"></a>
        {{ msg.message }}
      </vk-notification-message>
    </vk-notification>
  </div>
</template>

<script>
export default {
  name: 'PageNotification',
  data: () => ({
    messages: {
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
    }
  })
}
</script>
