<template>
  <div>
    <div class="uk-margin uk-flex uk-flex-center" uk-margin>
      <div class="uk-inline">
        <vk-button>Bottom Left</vk-button>
        <vk-drop
          position="bottom-left"
          :flip="false"
          :show="BL"
          @mouseenter="BL = true"
          @mouseleave="BL = false">
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
          :show="BC"
          @mouseenter="BC = true"
          @mouseleave="BC = false">
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
          :show="BR"
          @mouseenter="BR = true"
          @mouseleave="BR = false">
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
          :show="BJ"
          @mouseenter="BJ = true"
          @mouseleave="BJ = false">
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
          :show="TL"
          @mouseenter="TL = true"
          @mouseleave="TL = false">
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
          :show="TC"
          @mouseenter="TC = true"
          @mouseleave="TC = false">
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
          :show="TR"
          @mouseenter="TR = true"
          @mouseleave="TR = false">
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
          :show="TJ"
          @mouseenter="TJ = true"
          @mouseleave="TJ = false">
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
          :show="LT"
          @mouseenter="LT = true"
          @mouseleave="LT = false">
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
          :show="LC"
          @mouseenter="LC = true"
          @mouseleave="LC = false">
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
          :show="LB"
          @mouseenter="LB = true"
          @mouseleave="LB = false">
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
          :show="RT"
          @mouseenter="RT = true"
          @mouseleave="RT = false">
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
          :show="RC"
          @mouseenter="RC = true"
          @mouseleave="RC = false">
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
          :show="RB"
          @mouseenter="RB = true"
          @mouseleave="RB = false">
          <div class="uk-card uk-card-body uk-card-default">
            <p v-html="lorem"></p>
          </div>
        </vk-drop>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
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
    'RB': false,
    lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
  })
}
</script>
