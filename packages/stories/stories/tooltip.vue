<template>
  <div class="uk-padding ">

    <h1>Tooltip</h1>

    <div class="uk-tooltip uk-tooltip-top-center uk-display-inline-block uk-margin-remove uk-position-relative">Tooltip</div>

    <vk-grid class="uk-child-width-1-2@m">
      <div>

        <h2>Position</h2>

        <p v-vk-margin>
          <vk-button v-vk-tooltip="'Hello World'">Top</vk-button>
          <vk-button v-vk-tooltip.topLeft="'Hello World'">Top Left</vk-button>
          <vk-button v-vk-tooltip.topRight="'Hello World'">Top Right</vk-button>
        </p>

        <p v-vk-margin>
          <vk-button v-vk-tooltip.bottom="'Hello World'">Bottom</vk-button>
          <vk-button v-vk-tooltip.bottomLeft="'Hello World'">Bottom Left</vk-button>
          <vk-button v-vk-tooltip.bottomRight="'Hello World'">Bottom Right</vk-button>
        </p>

        <p v-vk-margin>
          <vk-button v-vk-tooltip.left="'Hello World'">Left</vk-button>
          <vk-button v-vk-tooltip.right="'Hello World'">Right</vk-button>
        </p>

        <h2>Misc</h2>

        <p v-vk-margin>
          <vk-button
            v-if="visible"
            v-vk-tooltip="'Hello World'"
            @click="visible = false"
          >I dissapear on click</vk-button>
        </p>

      </div>
      <form>

        <h2>Focused Form</h2>

        <p>
          <input
            class="uk-input uk-form-width-medium"
            type="text"
            placeholder="Input"
            v-vk-tooltip.left="'Hello World'"
          >
        </p>
        <p>
          <input
            class="uk-input uk-form-width-medium"
            type="text"
            placeholder="Input"
            v-vk-tooltip.right="'Hello World'"
          >
        </p>

        <vk-button v-vk-tooltip="{ title: 'Hello World', delay: 500 }">Delay 500</vk-button>
        <vk-button v-vk-tooltip="{
          title: 'Hello World',
          animation: 'scale-up scale-up',
          duration: 100
        }">Animations</vk-button>
        <vk-button-link title="Hello!" v-vk-tooltip>With title attr</vk-button-link>
        <vk-button-link v-vk-tooltip="">No title</vk-button-link>

      </form>
    </vk-grid>

  </div>
</template>

<script>
export default {
  data: () => ({
    visible: true
  })
}
</script>
