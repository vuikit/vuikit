<template>
  <div class="uk-padding">

    <h2>Boundary</h2>

    <div class="boundary uk-margin uk-flex uk-flex-between">

      <div class="uk-inline">
        <vk-button>Right</vk-button>
        <vk-drop position="bottom-right" boundary="!.boundary">
          <drop-content />
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Justify</vk-button>
        <vk-drop position="bottom-justify" boundary="!.boundary" boundary-align>
          <drop-content />
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Center</vk-button>
        <vk-drop position="bottom-center" boundary="!.boundary">
          <drop-content />
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Left</vk-button>
        <vk-drop position="bottom-left" boundary="!.boundary" boundary-align>
          <drop-content />
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Right</vk-button>
        <vk-drop position="bottom-right" boundary="!.boundary" boundary-align>
          <drop-content />
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Centered</vk-button>
        <vk-drop position="bottom-center" boundary="!.boundary" boundary-align>
          <drop-content />
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Left</vk-button>
        <vk-drop position="bottom-left" boundary="!.boundary">
          <drop-content />
        </vk-drop>
      </div>

    </div>

    <div class="boundary small-width uk-panel">

      <div class="uk-inline uk-margin-small-bottom">
        <vk-button>Top</vk-button>
        <vk-drop position="right-bottom" boundary="!.boundary">
          <drop-content />
        </vk-drop>
      </div>

      <div class="uk-inline uk-margin-small-bottom">
        <vk-button>Justify</vk-button>
        <vk-drop position="right-justify" boundary="!.boundary" boundary-align>
          <drop-content class="uk-height-1-1" />
        </vk-drop>
      </div>

      <div class="uk-inline uk-margin-small-bottom">
        <vk-button>Center</vk-button>
        <vk-drop position="right-center" boundary="!.boundary">
          <drop-content />
        </vk-drop>
      </div>

      <div class="uk-inline uk-margin-small-bottom">
        <vk-button>Top</vk-button>
        <vk-drop position="right-top" boundary="!.boundary" boundary-align>
          <drop-content />
        </vk-drop>
      </div>

      <div class="uk-inline uk-margin-small-bottom">
        <vk-button>Bottom</vk-button>
        <vk-drop position="right-bottom" boundary="!.boundary" boundary-align>
          <drop-content />
        </vk-drop>
      </div>

      <div class="uk-inline uk-margin-small-bottom">
        <vk-button>Centered</vk-button>
        <vk-drop position="right-center" boundary="!.boundary" boundary-align>
          <drop-content />
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Bottom</vk-button>
        <vk-drop position="right-top" boundary="!.boundary">
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
      render (h, { data }) {
        return h('vk-card', data, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.')
      }
    }
  }
}
</script>

<style scoped>
.boundary, .uk-drop { border: 1px dashed rgba(0,0,0,0.2); }
.small-width { width: 165px; }
</style>
