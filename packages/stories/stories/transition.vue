<template>
  <div class="uk-padding">

    <vk-button @click="show = !show">Toggle</vk-button>
    <vk-button @click="duration = 'fast', show = !show">Toggle Fast</vk-button>
    <vk-button @click="duration = 1000, show = !show">Toggle Custom Duration</vk-button>

    <div class="uk-section uk-height-viewport">
      <vk-grid matched class="uk-child-width-1-2 uk-child-width-1-4@s">
        <div>
          <vk-transition name="fade" :duration="duration">
            <vk-card v-show="show">
              <p class="uk-text-center">Fade</p>
            </vk-card>
          </vk-transition>
        </div>
        <div>
          <vk-transition name="scale-up" :duration="duration">
            <vk-card v-show="show">
              <p class="uk-text-center">Scale Up</p>
            </vk-card>
          </vk-transition>
        </div>
        <div>
          <vk-transition name="scale-down" :duration="duration">
            <vk-card v-show="show">
              <p class="uk-text-center">Scale Down</p>
            </vk-card>
          </vk-transition>
        </div>
        <div>
          <vk-transition name="shake" :duration="duration">
            <vk-card v-show="show">
              <p class="uk-text-center">Shake</p>
            </vk-card>
          </vk-transition>
        </div>
        <div>
          <vk-transition name="slide-left-small" :duration="duration">
            <vk-card v-show="show">
              <p class="uk-text-center">Slide Left Small</p>
            </vk-card>
          </vk-transition>
        </div>
        <div>
          <vk-transition name="slide-top-small" :duration="duration">
            <vk-card v-show="show">
              <p class="uk-text-center">Slide Top Small</p>
            </vk-card>
          </vk-transition>
        </div>
        <div>
          <vk-transition name="slide-bottom-small" :duration="duration">
            <vk-card v-show="show">
              <p class="uk-text-center">Slide Bottom Small</p>
            </vk-card>
          </vk-transition>
        </div>
        <div>
          <vk-transition name="slide-right-small" :duration="duration">
            <vk-card v-show="show">
              <p class="uk-text-center">Slide Right Small</p>
            </vk-card>
          </vk-transition>
        </div>
        <div>
          <vk-transition name="slide-left-medium" :duration="duration">
            <vk-card v-show="show">
              <p class="uk-text-center">Slide Left Medium</p>
            </vk-card>
          </vk-transition>
        </div>
        <div>
          <vk-transition name="slide-top-medium" :duration="duration">
            <vk-card v-show="show">
              <p class="uk-text-center">Slide Top Medium</p>
            </vk-card>
          </vk-transition>
        </div>
        <div>
          <vk-transition name="slide-bottom-medium" :duration="duration">
            <vk-card v-show="show">
              <p class="uk-text-center">Slide Bottom Medium</p>
            </vk-card>
          </vk-transition>
        </div>
        <div>
          <vk-transition name="slide-right-medium" :duration="duration">
            <vk-card v-show="show">
              <p class="uk-text-center">Slide Right Medium</p>
            </vk-card>
          </vk-transition>
        </div>
        <div>
          <vk-transition name="slide-left" :duration="duration">
            <vk-card v-show="show">
              <p class="uk-text-center">Slide Left</p>
            </vk-card>
          </vk-transition>
        </div>
        <div>
          <vk-transition name="slide-top" :duration="duration">
            <vk-card v-show="show">
              <p class="uk-text-center">Slide Top</p>
            </vk-card>
          </vk-transition>
        </div>
        <div>
          <vk-transition name="slide-bottom" :duration="duration">
            <vk-card v-show="show">
              <p class="uk-text-center">Slide Bottom</p>
            </vk-card>
          </vk-transition>
        </div>
        <div>
          <vk-transition name="slide-right" :duration="duration">
            <vk-card v-show="show">
              <p class="uk-text-center">Slide Right</p>
            </vk-card>
          </vk-transition>
        </div>
      </vk-grid>
    </div>

    <h2>Origin Modifiers</h2>
    <vk-button @click="show2 = !show2">Toggle</vk-button>
    <hr />

    <vk-grid class="uk-child-width-1-3@s uk-height-small">
      <div>
        <vk-transition name="scale-up" origin="bottom-right">
          <vk-card v-show="show2">
            <p class="uk-text-center">Bottom Right</p>
          </vk-card>
        </vk-transition>
      </div>
      <div>
        <vk-transition name="scale-up" origin="top-center">
          <vk-card v-show="show2">
            <p class="uk-text-center">Top Center</p>
          </vk-card>
        </vk-transition>
      </div>
      <div>
        <vk-transition name="scale-up" origin="bottom-center">
          <vk-card v-show="show2">
            <p class="uk-text-center">Bottom Center</p>
          </vk-card>
        </vk-transition>
      </div>
    </vk-grid>

    <h2>Differ Enter/Leave</h2>
    <vk-button @click="show3 = !show3">Toggle</vk-button>
    <hr />

    <vk-grid class="uk-child-width-1-3@s uk-height-small">
      <div>
        <vk-transition :name="{ enter: 'fade', leave: 'scale-up' }">
          <vk-card v-show="show3">
            <p class="uk-text-center">Bottom Right</p>
          </vk-card>
        </vk-transition>
      </div>
    </vk-grid>

  </div>
</template>

<script>
export default {
  data: () => ({
    show: true,
    show2: true,
    show3: true,
    duration: null
  })
}
</script>
