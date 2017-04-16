<template>
  <div class="uk-container uk-margin-bottom">
    <app-header></app-header>
    <h1>{{ $route.name }}</h1>
    <div class="uk-margin" uk-margin>

      <div class="uk-inline">
        <vk-button>Hover</vk-button>
        <vk-drop
          :show="base.hover"
          @mouseenter="base.hover = true"
          @mouseleave="({ delay }) => delay(800, () => { base.hover = false })">
          <div class="uk-card uk-card-body uk-card-default">
            <p v-html="lorem"></p>
            <vk-button primary class="uk-width-1-1">Hover</vk-button>
            <vk-drop
              :show="base.hover2"
              position="right-center"
              @mouseenter="base.hover2 = true"
              @mouseleave="({ delay }) => delay(800, () => { base.hover2 = false })">
              <div class="uk-card uk-card-body uk-card-default">
                <p v-html="lorem"></p>
                <vk-button primary class="uk-width-1-1">Hover</vk-button>
                <vk-drop
                  :show="base.hover3"
                  position="right-center"
                  @mouseenter="base.hover3= true"
                  @mouseleave="({ delay }) => delay(800, () => { base.hover3 = false })">
                  <div class="uk-card uk-card-body uk-card-default">
                    <p v-html="lorem"></p>
                  </div>
                </vk-drop>
              </div>
            </vk-drop>
          </div>
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button @click="base.click = !base.click">Click</vk-button>
        <vk-drop
          :show="base.click">
          <div class="uk-card uk-card-body uk-card-default">
            <p v-html="lorem"></p>
            <vk-button primary class="uk-width-1-1" @click="base.click2 = !base.click2">Click</vk-button>
            <vk-drop
              :show="base.click2"
              position="right-center">
              <div class="uk-card uk-card-body uk-card-default">
                <p v-html="lorem"></p>
                <vk-button primary class="uk-width-1-1" @click="base.click3 = !base.click3">Click</vk-button>
                <vk-drop
                  :show="base.click3"
                  position="right-center">
                  <div class="uk-card uk-card-body uk-card-default">
                    <p v-html="lorem"></p>
                  </div>
                </vk-drop>
              </div>
            </vk-drop>
          </div>
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Hover Only</vk-button>
        <vk-drop
          :show="base.hoverOnly"
          @mouseenter="base.hoverOnly= true"
          @mouseleave="base.hoverOnly = false">
          <div class="uk-card uk-card-body uk-card-default">
            <p v-html="lorem"></p>
          </div>
        </vk-drop>
      </div>

    </div>

    <h2>Position</h2>

    <div class="uk-margin uk-flex uk-flex-center" uk-margin>
      <div class="uk-inline">
        <vk-button>Bottom Left</vk-button>
        <vk-drop
          position="bottom-left"
          :flip="false"
          :show="pos.BL"
          @mouseenter="pos.BL = true"
          @mouseleave="pos.BL = false">
          <div class="uk-card uk-card-body uk-card-default">
            <p v-html="lorem"></p>
          </div>
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Bottom Center</vk-button>
        <vk-drop
          position="bottom-center"
          :flip="false"
          :show="pos.BC"
          @mouseenter="pos.BC = true"
          @mouseleave="pos.BC = false">
          <div class="uk-card uk-card-body uk-card-default">
            <p v-html="lorem"></p>
          </div>
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Bottom Right</vk-button>
        <vk-drop
          position="bottom-right"
          :flip="false"
          :show="pos.BR"
          @mouseenter="pos.BR = true"
          @mouseleave="pos.BR = false">
          <div class="uk-card uk-card-body uk-card-default">
            <p v-html="lorem"></p>
          </div>
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Bottom Justify</vk-button>
        <vk-drop
          position="bottom-justify"
          :flip="false"
          :show="pos.BJ"
          @mouseenter="pos.BJ = true"
          @mouseleave="pos.BJ = false">
          <div class="uk-card uk-card-body uk-card-default">
            <p v-html="lorem"></p>
          </div>
        </vk-drop>
      </div>
    </div>

    <div class="uk-margin uk-flex uk-flex-center" uk-margin>
      <div class="uk-inline">
        <vk-button>Top Left</vk-button>
        <vk-drop
          position="top-left"
          :flip="false"
          :show="pos.TL"
          @mouseenter="pos.TL = true"
          @mouseleave="pos.TL = false">
          <div class="uk-card uk-card-body uk-card-default">
            <p v-html="lorem"></p>
          </div>
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Top Center</vk-button>
        <vk-drop
          position="top-center"
          :flip="false"
          :show="pos.TC"
          @mouseenter="pos.TC = true"
          @mouseleave="pos.TC = false">
          <div class="uk-card uk-card-body uk-card-default">
            <p v-html="lorem"></p>
          </div>
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Top Right</vk-button>
        <vk-drop
          position="top-right"
          :flip="false"
          :show="pos.TR"
          @mouseenter="pos.TR = true"
          @mouseleave="pos.TR = false">
          <div class="uk-card uk-card-body uk-card-default">
            <p v-html="lorem"></p>
          </div>
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Top Justify</vk-button>
        <vk-drop
          position="top-justify"
          :flip="false"
          :show="pos.TJ"
          @mouseenter="pos.TJ = true"
          @mouseleave="pos.TJ = false">
          <div class="uk-card uk-card-body uk-card-default">
            <p v-html="lorem"></p>
          </div>
        </vk-drop>
      </div>
    </div>

    <div class="uk-margin uk-flex uk-flex-center" uk-margin>
      <div class="uk-inline">
        <vk-button>Left Top</vk-button>
        <vk-drop
          position="left-top"
          :flip="false"
          :show="pos.LT"
          @mouseenter="pos.LT = true"
          @mouseleave="pos.LT = false">
          <div class="uk-card uk-card-body uk-card-default">
            <p v-html="lorem"></p>
          </div>
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Left Center</vk-button>
        <vk-drop
          position="left-center"
          :flip="false"
          :show="pos.LC"
          @mouseenter="pos.LC = true"
          @mouseleave="pos.LC = false">
          <div class="uk-card uk-card-body uk-card-default">
            <p v-html="lorem"></p>
          </div>
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Left Bottom</vk-button>
        <vk-drop
          position="left-bottom"
          :flip="false"
          :show="pos.LB"
          @mouseenter="pos.LB = true"
          @mouseleave="pos.LB = false">
          <div class="uk-card uk-card-body uk-card-default">
            <p v-html="lorem"></p>
          </div>
        </vk-drop>
      </div>
    </div>

    <div class="uk-margin uk-flex uk-flex-center" uk-margin>
      <div class="uk-inline">
        <vk-button>Right Top</vk-button>
        <vk-drop
          position="right-top"
          :flip="false"
          :show="pos.RT"
          @mouseenter="pos.RT = true"
          @mouseleave="pos.RT = false">
          <div class="uk-card uk-card-body uk-card-default">
            <p v-html="lorem"></p>
          </div>
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Right Center</vk-button>
        <vk-drop
          position="right-center"
          :flip="false"
          :show="pos.RC"
          @mouseenter="pos.RC = true"
          @mouseleave="pos.RC = false">
          <div class="uk-card uk-card-body uk-card-default">
            <p v-html="lorem"></p>
          </div>
        </vk-drop>
      </div>

      <div class="uk-inline">
        <vk-button>Right Bottom</vk-button>
        <vk-drop
          position="right-bottom"
          :flip="false"
          :show="pos.RB"
          @mouseenter="pos.RB = true"
          @mouseleave="pos.RB = false">
          <div class="uk-card uk-card-body uk-card-default">
            <p v-html="lorem"></p>
          </div>
        </vk-drop>
      </div>
    </div>

    <h2>Drop with Boundary</h2>

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
  name: 'PageDrop',
  data: () => ({
    test: false,
    base: {
      hover: false,
      hover2: false,
      hover3: false,
      click: false,
      click2: false,
      click3: false,
      hoverOnly: false
    },
    pos: {
      'BL': false,
      'BC': false,
      'BR': false,
      'BJ': false,
      'TL': false,
      'TC': false,
      'TR': false,
      'TJ': false,
      'LT': false,
      'LC': false,
      'LB': false,
      'RT': false,
      'RC': false,
      'RB': false
    },
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
