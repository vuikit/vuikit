<template>
  <div class="uk-padding">
    <h2>Position</h2>

    <div class="uk-margin uk-flex uk-flex-center" v-vk-margin>

      <div class="uk-inline">
        <vk-button>Bottom Left</vk-button>
        <vk-drop :flip="false" position="bottom-left">
          <drop-content />
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Bottom Center</vk-button>
        <vk-drop :flip="false" position="bottom-center">
          <drop-content />
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Bottom Right</vk-button>
        <vk-drop :flip="false" position="bottom-right">
          <drop-content />
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Bottom Justify</vk-button>
        <vk-drop :flip="false" position="bottom-justify">
          <drop-content />
        </vk-drop>
      </div>

    </div>

    <div class="uk-margin uk-flex uk-flex-center" v-vk-margin>

      <div class="uk-inline">
        <vk-button>Top Left</vk-button>
        <vk-drop :flip="false" position="top-left">
          <drop-content />
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Top Center</vk-button>
        <vk-drop :flip="false" position="top-center">
          <drop-content />
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Top Right</vk-button>
        <vk-drop :flip="false" position="top-right">
          <drop-content />
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Top Justify</vk-button>
        <vk-drop :flip="false" position="top-justify">
          <drop-content />
        </vk-drop>
      </div>

    </div>

    <div class="uk-margin uk-flex uk-flex-center" v-vk-margin>

      <div class="uk-inline">
        <vk-button>Left Top</vk-button>
        <vk-drop :flip="false" position="left-top">
          <drop-content />
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Left Center</vk-button>
        <vk-drop :flip="false" position="left-center">
          <drop-content />
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Left Bottom</vk-button>
        <vk-drop :flip="false" position="left-bottom">
          <drop-content />
        </vk-drop>
      </div>

    </div>

    <div class="uk-margin uk-flex uk-flex-center" v-vk-margin>

      <div class="uk-inline">
        <vk-button>Right Top</vk-button>
        <vk-drop :flip="false" position="right-top">
          <drop-content />
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Right Center</vk-button>
        <vk-drop :flip="false" position="right-center">
          <drop-content />
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Right Bottom</vk-button>
        <vk-drop :flip="false" position="right-bottom">
          <drop-content />
        </vk-drop>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  components: {
    DropContent: {
      functional: true,
      render (h) {
        return h('vk-card', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.')
      }
    }
  }
}
</script>
