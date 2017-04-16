<template>
  <div class="uk-container uk-margin-bottom">
    <app-header></app-header>
    <h1>{{ $route.name }}</h1>
    <div class="uk-grid-small uk-child-width-expand@s" uk-grid>
      <div>
        <h2>Basic</h2>

        <vk-button>
          Hover
          <vk-dropdown
            :show="show.hover"
            @mouseenter="show.hover = true"
            @mouseleave="({ delay }) => {
              delay(800, () => {
                show.hover = false
              })
            }">
            <div v-html="content" />
          </vk-dropdown>
        </vk-button>

        <vk-button>
          Click
          <vk-dropdown
            :show="show.click"
            @click-out="show.click = false"
            @click-target="show.click = !show.click">
            <div v-html="content" />
          </vk-dropdown>
        </vk-button>

      </div>

      <div>
        <h2>Animations</h2>

        <vk-button>
          Fade
          <vk-dropdown
            animation="uk-animation-fade, uk-animation-fade uk-animation-reverse"
            :show="show.fade"
            @mouseenter="show.fade = true"
            @mouseleave="show.fade = false">
            <div v-html="content" />
          </vk-dropdown>
        </vk-button>

        <vk-button>
          Slide
          <vk-dropdown
            animation="uk-animation-slide-top-small, uk-animation-slide-top-small uk-animation-reverse"
            :show="show.slide"
            @mouseenter="show.slide = true"
            @mouseleave="show.slide = false">
            <div v-html="content" />
          </vk-dropdown>
        </vk-button>

        <vk-button>
          Scale
          <vk-dropdown
            animation="uk-animation-scale-down, uk-animation-scale-down uk-animation-reverse"
            :show="show.scale"
            @mouseenter="show.scale = true"
            @mouseleave="show.scale = false">
            <div v-html="content" />
          </vk-dropdown>
        </vk-button>

      </div>
    </div>

    <div class="uk-margin-large-top">
      <h2>Positions</h2>
      <div class="uk-text-center uk-margin-large-top uk-child-width-1-3@s" uk-grid>
        <div>
          <vk-button>
            TOP LEFT
            <vk-dropdown
              :flip="false"
              position="top-left"
              :show="show.top.left"
              @click-out="show.top.left = false"
              @mouseenter="show.top.left = true"
              @mouseleave="show.top.left = false">
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
              :show="show.top.center"
              @click-out="show.top.center = false"
              @mouseenter="show.top.center = true"
              @mouseleave="show.top.center = false">
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
              :show="show.top.right"
              @click-out="show.top.right = false"
              @mouseenter="show.top.right = true"
              @mouseleave="show.top.right = false">
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
              :show="show.left.top"
              @click-out="show.left.top = false"
              @mouseenter="show.left.top = true"
              @mouseleave="show.left.top = false">
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
              :show="show.right.top"
              @click-out="show.right.top = false"
              @mouseenter="show.right.top = true"
              @mouseleave="show.right.top = false">
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
              :show="show.left.center"
              @click-out="show.left.center = false"
              @mouseenter="show.left.center = true"
              @mouseleave="show.left.center = false">
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
              :show="show.right.center"
              @click-out="show.right.center = false"
              @mouseenter="show.right.center = true"
              @mouseleave="show.right.center = false">
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
              :show="show.left.bottom"
              @click-out="show.left.bottom = false"
              @mouseenter="show.left.bottom = true"
              @mouseleave="show.left.bottom = false">
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
              :show="show.right.bottom"
              @click-out="show.right.bottom = false"
              @mouseenter="show.right.bottom = true"
              @mouseleave="show.right.bottom = false">
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
              :show="show.bottom.left"
              @click-out="show.bottom.left = false"
              @mouseenter="show.bottom.left = true"
              @mouseleave="show.bottom.left = false">
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
              :show="show.bottom.center"
              @click-out="show.bottom.center = false"
              @mouseenter="show.bottom.center = true"
              @mouseleave="show.bottom.center = false">
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
              :show="show.bottom.right"
              @click-out="show.bottom.right = false"
              @mouseenter="show.bottom.right = true"
              @mouseleave="show.bottom.right = false">
              <div v-html="content" />
            </vk-dropdown>
          </vk-button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageDropdown',
  data: () => ({
    show: {
      hover: false,
      click: false,
      fade: false,
      slide: false,
      scale: false,
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
      }
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
