<template>
  <div class="uk-padding">

    <h1>Height Viewport</h1>

    <vk-grid class="uk-child-width-1-6@m uk-light">
      <div>
        <div class="uk-section uk-section-primary uk-flex uk-flex-center uk-flex-middle uk-text-center uk-height-viewport">
          <h1>CSS</h1>
        </div>
      </div>

      <div>
        <div class="uk-section uk-section-primary uk-flex uk-flex-center uk-flex-middle uk-text-center" v-vk-height-viewport>
          <h1>JS</h1>
        </div>
      </div>

      <div>
        <div class="uk-section uk-section-primary uk-flex uk-flex-center uk-flex-middle uk-text-center" v-vk-height-viewport="{ offsetTop: true }">
          <div>
            <h1>JS</h1>
            <div>top: true</div>
          </div>
        </div>
      </div>

      <div>
        <div class="uk-section uk-section-primary uk-flex uk-flex-center uk-flex-middle uk-text-center" v-vk-height-viewport="{ offsetTop: true, offsetBottom: true }">
          <div>
            <h1>JS</h1>
            <div>top: true</div>
            <div>bottom: true</div>
          </div>
        </div>

        <div class="uk-padding uk-background-secondary">Lorem ipsum dolor sit amet.</div>
      </div>

      <div>
        <div class="uk-section uk-section-primary uk-flex uk-flex-center uk-flex-middle uk-text-center" v-vk-height-viewport="{ offsetTop: true, offsetBottom: 10 }">
          <div>
            <h1>JS</h1>
            <div>top: true</div>
            <div>bottom: 10%</div>
          </div>
        </div>
      </div>

      <div>
        <div class="uk-section uk-section-primary uk-flex uk-flex-center uk-flex-middle uk-text-center" v-vk-height-viewport="{ offsetTop: true, offsetBottom: '50px' }">
          <div>
            <h1>JS</h1>
            <div>top: true</div>
            <div>bottom: 50px</div>
          </div>
        </div>
      </div>
    </vk-grid>

    <vk-grid class="uk-child-width-1-6@m uk-light">
      <div>

        <div class="uk-section uk-section-primary uk-flex uk-flex-center uk-flex-middle uk-text-center uk-height-viewport">
          <h1>CSS</h1>
        </div>

      </div>
      <div>

        <div class="uk-section uk-section-primary uk-flex uk-flex-center uk-flex-middle uk-text-center" v-vk-height-viewport>
          <h1>JS</h1>
        </div>

      </div>
      <div>

        <div class="uk-section uk-section-primary uk-flex uk-flex-center uk-flex-middle uk-text-center" v-vk-height-viewport="{ offsetTop: true }">
          <div>
            <h1>JS</h1>
            <div>top: true</div>
          </div>
        </div>

      </div>
      <div>

        <div class="uk-section uk-section-primary uk-flex uk-flex-center uk-flex-middle uk-text-center" v-vk-height-viewport="{ offsetTop: true, offsetBottom: true }">
          <div>
            <h1>JS</h1>
            <div>top: true</div>
            <div>bottom: true</div>
          </div>
        </div>

        <div class="uk-padding uk-background-secondary">Lorem ipsum dolor sit amet.</div>

      </div>
      <div>

        <div class="uk-section uk-section-primary uk-flex uk-flex-center uk-flex-middle uk-text-center" v-vk-height-viewport="{ offsetTop: true, offsetBottom: 10 }">
          <div>
            <h1>JS</h1>
            <div>top: true</div>
            <div>bottom: 10%</div>
          </div>
        </div>

      </div>
      <div>

        <div class="uk-section uk-section-primary uk-flex uk-flex-center uk-flex-middle uk-text-center" v-vk-height-viewport="{ offsetTop: true, offsetBottom: '50px' }">
          <div>
            <h1>JS</h1>
            <div>top: true</div>
            <div>bottom: 50px</div>
          </div>
        </div>

      </div>
    </vk-grid>

  </div>
</template>
