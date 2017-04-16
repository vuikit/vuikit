<template>
  <div class="uk-container uk-margin-bottom">
    <app-header></app-header>
    <h1>{{ $route.name }}</h1>
    <div class="uk-grid-small uk-child-width-expand@s" uk-grid>
      <div>
        <h2>Basic</h2>
        <vk-button>
          BUTTON
          <vk-tooltip content="Tooltip" />
        </vk-button>
        <vk-button>
          DELAYED
          <vk-tooltip content="Tooltip" delay="500" />
        </vk-button>
        <span ref="spanref">
          SPAN
          <vk-tooltip content="Tooltip" />
        </span>
      </div>
    </div>

    <div class="uk-margin-large-top">
      <h2>Positions</h2>

      <div class="uk-text-center uk-margin-large-top uk-child-width-1-3@s" uk-grid>
        <div>
          <vk-button>
            TOP LEFT
            <vk-tooltip content="Tooltip" position="top-left" :flip="false" />
          </vk-button>
        </div>
        <div>
          <vk-button>
            TOP
            <vk-tooltip content="Tooltip" position="top" :flip="false" />
          </vk-button>
        </div>
        <div>
          <vk-button>
            TOP RIGHT
            <vk-tooltip content="Tooltip" position="top-right" :flip="false" />
          </vk-button>
        </div>
      </div>

      <div class="uk-text-center uk-margin-large-top uk-child-width-1-3@s" uk-grid>
        <div>
          <vk-button>
            LEFT
            <vk-tooltip content="Tooltip" position="left" :flip="false" />
          </vk-button>
        </div>
        <div></div>
        <div>
          <vk-button>
            RIGHT
            <vk-tooltip content="Tooltip" position="right" :flip="false" />
          </vk-button>
        </div>
      </div>

      <div class="uk-text-center uk-margin-large-top uk-child-width-1-3@s" uk-grid>
        <div>
          <vk-button>
            BOTTOM LEFT
            <vk-tooltip content="Tooltip" position="bottom-left" :flip="false" />
          </vk-button>
        </div>
        <div>
           <vk-button>
            BOTTOM
            <vk-tooltip content="Tooltip" position="bottom" :flip="false" />
          </vk-button>
        </div>
        <div>
          <vk-button>
            BOTTOM RIGHT
            <vk-tooltip content="Tooltip" position="bottom-right" :flip="false" />
          </vk-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'PageTooltip',
  data: () => ({
  })
}
</script>
