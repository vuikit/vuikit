<template>
  <div class="uk-padding">

    <h1>Height Viewport</h1>

    <vk-grid class="uk-child-width-1-6@m uk-light">
      <div>
        <demo-section class="uk-height-viewport">
          <h1>CSS</h1>
        </demo-section>
      </div>

      <div>
        <demo-section v-vk-height-viewport>
          <h1>JS</h1>
        </demo-section>
      </div>

      <div>
        <demo-section v-vk-height-viewport.offsetTop>
          <div>
            <h1>JS</h1>
            <div>top: true</div>
          </div>
        </demo-section>
      </div>

      <div>
        <demo-section v-vk-height-viewport.offsetTop.offsetBottom>
          <div>
            <h1>JS</h1>
            <div>top: true</div>
            <div>bottom: true</div>
          </div>
        </demo-section>

        <div class="uk-padding uk-background-secondary">Lorem ipsum dolor sit amet.</div>
      </div>

      <div>
        <demo-section v-vk-height-viewport.offsetTop="{ offsetBottom: 10 }">
          <div>
            <h1>JS</h1>
            <div>top: true</div>
            <div>bottom: 10%</div>
          </div>
        </demo-section>
      </div>

      <div>
        <demo-section v-vk-height-viewport.offsetTop="{ offsetBottom: '50px' }">
          <div>
            <h1>JS</h1>
            <div>top: true</div>
            <div>bottom: 50px</div>
          </div>
        </demo-section>
      </div>
    </vk-grid>

    <vk-grid class="uk-child-width-1-6@m uk-light">
      <div>

        <demo-section class="uk-height-viewport">
          <h1>CSS</h1>
        </demo-section>

      </div>
      <div>

        <demo-section v-vk-height-viewport>
          <h1>JS</h1>
        </demo-section>

      </div>
      <div>

        <demo-section v-vk-height-viewport.offsetTop>
          <div>
            <h1>JS</h1>
            <div>top: true</div>
          </div>
        </demo-section>

      </div>
      <div>

        <demo-section v-vk-height-viewport.offsetTop.offsetBottom>
          <div>
            <h1>JS</h1>
            <div>top: true</div>
            <div>bottom: true</div>
          </div>
        </demo-section>

        <div class="uk-padding uk-background-secondary">Lorem ipsum dolor sit amet.</div>

      </div>
      <div>

        <demo-section v-vk-height-viewport.offsetTop="{ offsetBottom: 10 }">
          <div>
            <h1>JS</h1>
            <div>top: true</div>
            <div>bottom: 10%</div>
          </div>
        </demo-section>

      </div>
      <div>

        <demo-section v-vk-height-viewport.offsetTop="{ offsetBottom: '50px' }">
          <div>
            <h1>JS</h1>
            <div>top: true</div>
            <div>bottom: 50px</div>
          </div>
        </demo-section>

      </div>
    </vk-grid>

  </div>
</template>

<script>
import { mergeData } from 'vuikit/src/util/vue'

export default {
  components: {
    DemoSection: {
      functional: true,
      render (h, { data, children }) {
        return h('div', mergeData(data, {
          class: 'uk-section uk-section-primary uk-flex uk-flex-center uk-flex-middle uk-text-center'
        }), children)
      }
    }
  }
}
</script>
