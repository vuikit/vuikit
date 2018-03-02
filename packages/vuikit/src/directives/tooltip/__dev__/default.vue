<template>
  <div class="uk-padding ">

    <h1>Tooltip</h1>

    <div class="uk-tooltip uk-tooltip-top-center uk-display-inline-block uk-margin-remove uk-position-relative">Tooltip</div>

    <vk-grid class="uk-child-width-1-2@m">
      <div>

        <h2>Position</h2>

        <p v-vk-margin>
          <vk-button v-vk-tooltip="'Hello World'">Top</vk-button>
          <vk-button v-vk-tooltip="{ title: 'Hello World', position: 'top-left' }">Top Left</vk-button>
          <vk-button v-vk-tooltip="{ title: 'Hello World', position: 'top-right' }">Top Right</vk-button>
        </p>

        <p v-vk-margin>
          <vk-button v-vk-tooltip="{ title: 'Hello World', position: 'bottom' }">Bottom</vk-button>
          <vk-button v-vk-tooltip="{ title: 'Hello World', position: 'bottom-left' }">Bottom Left</vk-button>
          <vk-button v-vk-tooltip="{ title: 'Hello World', position: 'bottom-right' }">Bottom Right</vk-button>
        </p>

        <p v-vk-margin>
          <vk-button v-vk-tooltip="{ title: 'Hello World', position: 'left' }">Left</vk-button>
          <vk-button v-vk-tooltip="{ title: 'Hello World', position: 'right' }">Right</vk-button>
        </p>

      </div>
      <form>

        <h2>Focused Form</h2>

        <p>
          <input class="uk-input uk-form-width-medium" type="text" placeholder="Input" v-vk-tooltip="{ title: 'Hello World', position: 'left' }">
        </p>
        <p>
          <input class="uk-input uk-form-width-medium" type="text" placeholder="Input" v-vk-tooltip="{ title: 'Hello World', position: 'right' }">
        </p>

        <vk-button v-vk-tooltip="{ title: 'Hello World', delay: 500 }">Delay 500</vk-button>

      </form>
    </vk-grid>

  </div>
</template>
