<template>
  <div class="uk-padding">
    <div ref="boundary" class="boundary uk-margin uk-flex uk-flex-between">

      <div class="uk-inline">
        <vk-button>Right</vk-button>
        <vk-drop
          position="bottom-right"
          boundary-ref="boundary"
          :show="boundary.right"
          @mouseenter="boundary.right = true"
          @mouseleave="boundary.right = false">
          <div class="uk-card uk-card-body uk-card-default"
            v-html="lorem">
          </div>
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Justify</vk-button>
        <vk-drop
          position="bottom-justify"
          boundary-ref="boundary"
          boundary-align
          :show="boundary.justify"
          @mouseenter="boundary.justify = true"
          @mouseleave="boundary.justify = false">
          <div class="uk-card uk-card-body uk-card-default"
            v-html="lorem">
          </div>
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Center</vk-button>
        <vk-drop
          position="bottom-center"
          boundary-ref="boundary"
          :show="boundary.center"
          @mouseenter="boundary.center = true"
          @mouseleave="boundary.center = false">
          <div class="uk-card uk-card-body uk-card-default"
            v-html="lorem">
          </div>
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Left</vk-button>
        <vk-drop
          position="bottom-left"
          boundary-ref="boundary"
          boundary-align
          :show="boundary.left"
          @mouseenter="boundary.left = true"
          @mouseleave="boundary.left = false">
          <div class="uk-card uk-card-body uk-card-default"
            v-html="lorem">
          </div>
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Right</vk-button>
        <vk-drop
          position="bottom-right"
          boundary-ref="boundary"
          boundary-align
          :show="boundary.right2"
          @mouseenter="boundary.right2 = true"
          @mouseleave="boundary.right2 = false">
          <div class="uk-card uk-card-body uk-card-default"
            v-html="lorem">
          </div>
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Centered</vk-button>
        <vk-drop
          position="bottom-center"
          boundary-ref="boundary"
          boundary-align
          :show="boundary.centered"
          @mouseenter="boundary.centered = true"
          @mouseleave="boundary.centered = false">
          <div class="uk-card uk-card-body uk-card-default"
            v-html="lorem">
          </div>
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Left</vk-button>
        <vk-drop
          position="bottom-left"
          boundary-ref="boundary"
          :show="boundary.left2"
          @mouseenter="boundary.left2 = true"
          @mouseleave="boundary.left2 = false">
          <div class="uk-card uk-card-body uk-card-default"
            v-html="lorem">
          </div>
        </vk-drop>
      </div>
    </div>

    <div ref="boundary2" class="boundary small-width uk-panel">

      <div class="uk-inline uk-margin-small-bottom">
        <vk-button>Top</vk-button>
        <vk-drop
          position="right-bottom"
          boundary-ref="boundary2"
          :show="boundary2.top"
          @mouseenter="boundary2.top = true"
          @mouseleave="boundary2.top = false">
          <div class="uk-card uk-card-body uk-card-default"
            v-html="lorem">
          </div>
        </vk-drop>
      </div>

      <div class="uk-inline uk-margin-small-bottom">
        <vk-button>Justify</vk-button>
        <vk-drop
          position="right-justify"
          boundary-ref="boundary2"
          boundary-align
          :show="boundary2.justify"
          @mouseenter="boundary2.justify = true"
          @mouseleave="boundary2.justify = false">
          <div class="uk-card uk-card-body uk-card-default uk-height-1-1"
            v-html="lorem">
          </div>
        </vk-drop>
      </div>

      <div class="uk-inline uk-margin-small-bottom">
        <vk-button>Center</vk-button>
        <vk-drop
          position="right-center"
          boundary-ref="boundary2"
          :show="boundary2.center"
          @mouseenter="boundary2.center = true"
          @mouseleave="boundary2.center = false">
          <div class="uk-card uk-card-body uk-card-default"
            v-html="lorem">
          </div>
        </vk-drop>
      </div>

      <div class="uk-inline uk-margin-small-bottom">
        <vk-button>Top</vk-button>
        <vk-drop
          position="right-top"
          boundary-ref="boundary2"
          boundary-align
          :show="boundary2.top2"
          @mouseenter="boundary2.top2 = true"
          @mouseleave="boundary2.top2 = false">
          <div class="uk-card uk-card-body uk-card-default"
            v-html="lorem">
          </div>
        </vk-drop>
      </div>

      <div class="uk-inline uk-margin-small-bottom">
        <vk-button>Bottom</vk-button>
        <vk-drop
          position="right-bottom"
          boundary-ref="boundary2"
          boundary-align
          :show="boundary2.bottom"
          @mouseenter="boundary2.bottom = true"
          @mouseleave="boundary2.bottom = false">
          <div class="uk-card uk-card-body uk-card-default"
            v-html="lorem">
          </div>
        </vk-drop>
      </div>

      <div class="uk-inline uk-margin-small-bottom">
        <vk-button>Centered</vk-button>
        <vk-drop
          position="right-center"
          boundary-ref="boundary2"
          boundary-align
          :show="boundary2.centered"
          @mouseenter="boundary2.centered = true"
          @mouseleave="boundary2.centered = false">
          <div class="uk-card uk-card-body uk-card-default"
            v-html="lorem">
          </div>
        </vk-drop>
      </div>

      <div class="uk-inline uk-margin-small-bottom">
        <vk-button>Bottom</vk-button>
        <vk-drop
          position="right-top"
          boundary-ref="boundary2"
          :show="boundary2.bottom2"
          @mouseenter="boundary2.bottom2 = true"
          @mouseleave="boundary2.bottom2 = false">
          <div class="uk-card uk-card-body uk-card-default"
            v-html="lorem">
          </div>
        </vk-drop>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    boundary: {
      right: false,
      justify: false,
      center: false,
      left: false,
      right2: false,
      centered: false,
      left2: false
    },
    boundary2: {
      top: false,
      justify: false,
      center: false,
      top2: false,
      bottom: false,
      centered: false,
      bottom2: false
    },
    lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
  })
}
</script>

<style scoped>
.boundary {
  border: 1px dashed rgba(0,0,0,0.2);
}
.small-width {
  width: 165px;
}
</style>
