<template>
  <div class="uk-padding" v-vk-margin>

    <!-- Hover with childs -->
    <div class="uk-inline">
      <vk-button>Hover</vk-button>
      <vk-drop>
        <vk-card>
          <lorem-ipsum />

          <vk-button type="primary" class="uk-width-1-1">Hover</vk-button>
          <vk-drop position="right-center" :offset="50">
            <vk-card>
              <lorem-ipsum />

              <vk-button type="primary" class="uk-width-1-1">Hover</vk-button>
              <vk-drop position="right-center" :offset="50">
                <vk-card>
                  <lorem-ipsum />
                </vk-card>
              </vk-drop>
            </vk-card>
          </vk-drop>

        </vk-card>
      </vk-drop>
    </div>

    <!-- Click with childs -->
    <div class="uk-inline">
      <vk-button>Click</vk-button>
      <vk-drop mode="click">
        <vk-card>
          <lorem-ipsum />

          <vk-button type="primary" class="uk-width-1-1">Click</vk-button>
          <vk-drop position="right-center" :offset="50" mode="click">
            <vk-card>
              <lorem-ipsum />

              <vk-button type="primary" class="uk-width-1-1">Click</vk-button>
              <vk-drop position="right-center" :offset="50" mode="click">
                <vk-card>
                  <lorem-ipsum />
                </vk-card>
              </vk-drop>
            </vk-card>
          </vk-drop>

        </vk-card>
      </vk-drop>
    </div>

    <div class="uk-inline">
      <vk-button>Hover Only</vk-button>
      <vk-drop mode="hover" :delay-hide="0">
        <vk-card>
          <lorem-ipsum />
        </vk-card>
      </vk-drop>
    </div>

  </div>
</template>

<script>
export default {
  components: {
    LoremIpsum: {
      functional: true,
      render (h) {
        return h('p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.')
      }
    }
  }
}
</script>
