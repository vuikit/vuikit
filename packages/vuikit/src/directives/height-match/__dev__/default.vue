<template>
  <div class="uk-padding">

    <vk-grid class="uk-child-width-1-2@s">
      <div>

        <h3>Each Row</h3>

        <vk-grid class="uk-child-width-1-2@m" v-vk-height-match="'> div > .uk-panel'">
          <div><div class="uk-panel">1-2-M<br>...<br>...</div></div>
          <div><div class="uk-panel">1-2-M</div></div>
          <div><div class="uk-panel">1-2-M<br>...</div></div>
          <div><div class="uk-panel">1-2-M</div></div>
        </vk-grid>

      </div>
      <div>

        <h3>All Rows</h3>

        <vk-grid class="uk-child-width-1-2@m" v-vk-height-match="{ target: ' > div > .uk-panel', row: false }">
          <div><div class="uk-panel">1-2-M<br>...<br>...</div></div>
          <div><div class="uk-panel">1-2-M</div></div>
          <div><div class="uk-panel">1-2-M<br>...</div></div>
          <div><div class="uk-panel">1-2-M</div></div>
        </vk-grid>

      </div>
      <div>

        <h3>Hidden Panels</h3>

        <vk-grid class="uk-child-width-1-2@m" v-vk-height-match="{ target: ' > div > .uk-panel', row: false }">
          <div><div class="uk-panel" style="display: none;">1-2-M<br>...<br>...</div></div>
          <div><div class="uk-panel">1-2-M<br>...</div></div>
        </vk-grid>

      </div>
    </vk-grid>

  </div>
</template>

<style scoped>
  .uk-grid > div > .uk-panel {
    padding: 10px;
    text-align: center;
  }

  .uk-grid > :nth-child(10n-9) > .uk-panel { background: rgba(0,0,0,0.1); }
  .uk-grid > :nth-child(10n-8) > .uk-panel { background: rgba(0,0,0,0.15); }
  .uk-grid > :nth-child(10n-7) > .uk-panel { background: rgba(0,0,0,0.2); }
  .uk-grid > :nth-child(10n-6) > .uk-panel { background: rgba(0,0,0,0.25); }
  .uk-grid > :nth-child(10n-5) > .uk-panel { background: rgba(0,0,0,0.3); }
  .uk-grid > :nth-child(10n-4) > .uk-panel { background: rgba(0,0,0,0.35); }
  .uk-grid > :nth-child(10n-3) > .uk-panel { background: rgba(0,0,0,0.40); }
  .uk-grid > :nth-child(10n-2) > .uk-panel { background: rgba(0,0,0,0.45); }
  .uk-grid > :nth-child(10n-1) > .uk-panel { background: rgba(0,0,0,0.50); }
  .uk-grid > :nth-child(10n) > .uk-panel { background: rgba(0,0,0,0.55); }
</style>
