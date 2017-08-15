<template>
  <div>
    <div class="uk-text-center uk-margin-large-top uk-child-width-1-3@s" uk-grid>
      <div>
        <vk-button>
          TOP LEFT
          <vk-dropdown
            :flip="false"
            position="top-left"
            :show="top.left"
            @click-out="top.left = false"
            @mouseenter="top.left = true"
            @mouseleave="top.left = false">
            <div v-html="content" />
          </vk-dropdown>
        </vk-button>
      </div>
      <div>
        <vk-button>
          TOP CENTER
          <vk-dropdown
            :flip="false"
            position="top-center"
            :show="top.center"
            @click-out="top.center = false"
            @mouseenter="top.center = true"
            @mouseleave="top.center = false">
            <div v-html="content" />
          </vk-dropdown>
        </vk-button>
      </div>
      <div>
        <vk-button>
          TOP RIGHT
          <vk-dropdown
            :flip="false"
            position="top-right"
            :show="top.right"
            @click-out="top.right = false"
            @mouseenter="top.right = true"
            @mouseleave="top.right = false">
            <div v-html="content" />
          </vk-dropdown>
        </vk-button>
      </div>
    </div>

    <div class="uk-text-center uk-margin-large-top uk-child-width-1-3@s" uk-grid>
      <div>
        <vk-button>
          LEFT TOP
          <vk-dropdown
            :flip="false"
            position="left-top"
            :show="left.top"
            @click-out="left.top = false"
            @mouseenter="left.top = true"
            @mouseleave="left.top = false">
            <div v-html="content" />
          </vk-dropdown>
        </vk-button>
      </div>
      <div>

      </div>
      <div>
        <vk-button>
          RIGHT TOP
          <vk-dropdown
            :flip="false"
            position="right-top"
            :show="right.top"
            @click-out="right.top = false"
            @mouseenter="right.top = true"
            @mouseleave="right.top = false">
            <div v-html="content" />
          </vk-dropdown>
        </vk-button>
      </div>
    </div>

    <div class="uk-text-center uk-margin-large-top uk-child-width-1-3@s" uk-grid>
      <div>
        <vk-button>
          LEFT CENTER
          <vk-dropdown
            :flip="false"
            position="left"
            :show="left.center"
            @click-out="left.center = false"
            @mouseenter="left.center = true"
            @mouseleave="left.center = false">
            <div v-html="content" />
          </vk-dropdown>
        </vk-button>
      </div>
      <div>

      </div>
      <div>

        <vk-button>
          RIGHT CENTER
          <vk-dropdown
            :flip="false"
            position="right-center"
            :show="right.center"
            @click-out="right.center = false"
            @mouseenter="right.center = true"
            @mouseleave="right.center = false">
            <div v-html="content" />
          </vk-dropdown>
        </vk-button>
      </div>
    </div>

    <div class="uk-text-center uk-margin-large-top uk-child-width-1-3@s" uk-grid>
      <div>
        <vk-button>
          LEFT BOTTOM
          <vk-dropdown
            :flip="false"
            position="left-bottom"
            :show="left.bottom"
            @click-out="left.bottom = false"
            @mouseenter="left.bottom = true"
            @mouseleave="left.bottom = false">
            <div v-html="content" />
          </vk-dropdown>
        </vk-button>
      </div>
      <div>
      </div>
      <div>
        <vk-button>
          RIGHT BOTTOM
          <vk-dropdown
            :flip="false"
            position="right-bottom"
            :show="right.bottom"
            @click-out="right.bottom = false"
            @mouseenter="right.bottom = true"
            @mouseleave="right.bottom = false">
            <div v-html="content" />
          </vk-dropdown>
        </vk-button>
      </div>
    </div>
    <div class="uk-text-center uk-margin-large-top uk-child-width-1-3@s" uk-grid>

      <div>
        <vk-button>
          BOTTOM LEFT
          <vk-dropdown
            :flip="false"
            position="bottom-left"
            :show="bottom.left"
            @click-out="bottom.left = false"
            @mouseenter="bottom.left = true"
            @mouseleave="bottom.left = false">
            <div v-html="content" />
          </vk-dropdown>
        </vk-button>
      </div>
      <div>
         <vk-button>
          BOTTOM CENTER
          <vk-dropdown
            :flip="false"
            position="bottom-center"
            :show="bottom.center"
            @click-out="bottom.center = false"
            @mouseenter="bottom.center = true"
            @mouseleave="bottom.center = false">
            <div v-html="content" />
          </vk-dropdown>
        </vk-button>
      </div>
      <div>
        <vk-button>
          BOTTOM RIGHT
          <vk-dropdown
            :flip="false"
            position="bottom-right"
            :show="bottom.right"
            @click-out="bottom.right = false"
            @mouseenter="bottom.right = true"
            @mouseleave="bottom.right = false">
            <div v-html="content" />
          </vk-dropdown>
        </vk-button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'PageDropdown',
  data: () => ({
    top: {
      left: false,
      center: false,
      right: false
    },
    right: {
      top: false,
      center: false,
      bottom: false
    },
    bottom: {
      left: false,
      center: false,
      right: false
    },
    left: {
      top: false,
      center: false,
      bottom: false
    },
    content: `
      <ul class="uk-nav uk-dropdown-nav">
        <li class="uk-active"><a href="#">Active</a></li>
        <li><a href="#">Item</a></li>
        <li><a href="#">Item</a></li>
      </ul>
    `
  })
}
</script>
