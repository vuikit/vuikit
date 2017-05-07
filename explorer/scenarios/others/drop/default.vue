<template>
  <div>
    <div class="uk-inline">
      <vk-button>Hover</vk-button>
      <vk-drop
        :show="hover"
        @mouseenter="hover = true"
        @mouseleave="({ delay }) => delay(800, () => { hover = false })">
        <div class="uk-card uk-card-body uk-card-default">
          <p v-html="lorem"></p>
          <vk-button primary class="uk-width-1-1">Hover</vk-button>
          <vk-drop
            :show="hover2"
            position="right-center"
            @mouseenter="hover2 = true"
            @mouseleave="({ delay }) => delay(800, () => { hover2 = false })">
            <div class="uk-card uk-card-body uk-card-default">
              <p v-html="lorem"></p>
              <vk-button primary class="uk-width-1-1">Hover</vk-button>
              <vk-drop
                :show="hover3"
                position="right-center"
                @mouseenter="hover3= true"
                @mouseleave="({ delay }) => delay(800, () => { hover3 = false })">
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
      <vk-button @click="click = !click">Click</vk-button>
      <vk-drop
        :show="click">
        <div class="uk-card uk-card-body uk-card-default">
          <p v-html="lorem"></p>
          <vk-button primary class="uk-width-1-1" @click="click2 = !click2">Click</vk-button>
          <vk-drop
            :show="click2"
            position="right-center">
            <div class="uk-card uk-card-body uk-card-default">
              <p v-html="lorem"></p>
              <vk-button primary class="uk-width-1-1" @click="click3 = !click3">Click</vk-button>
              <vk-drop
                :show="click3"
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
        :show="hoverOnly"
        @mouseenter="hoverOnly= true"
        @mouseleave="hoverOnly = false">
        <div class="uk-card uk-card-body uk-card-default">
          <p v-html="lorem"></p>
        </div>
      </vk-drop>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    hover: false,
    hover2: false,
    hover3: false,
    click: false,
    click2: false,
    click3: false,
    hoverOnly: false,
    lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
  })
}
</script>
