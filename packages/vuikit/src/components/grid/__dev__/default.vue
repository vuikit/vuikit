<template>
  <div class="uk-padding">

    <h2>Grid</h2>
    <grid-demo />
    <h3>Divider</h3>
    <grid-divider-demo />

    <h2>Small</h2>
    <grid-demo gutter="small" />
    <h3>Divider</h3>
    <grid-divider-demo gutter="small" />

    <h2>Medium</h2>
    <grid-demo gutter="medium" />
    <h3>Divider</h3>
    <grid-divider-demo gutter="medium" />

    <h2>Large</h2>
    <grid-demo gutter="large" />
    <h3>Divider</h3>
    <grid-divider-demo gutter="large" />

    <h2>Collapse</h2>
    <grid-demo gutter="collapse" />

    <h2>Divider</h2>

    <h3>Order</h3>

    <vk-grid divided class="uk-child-width-1-2@m">
      <div>

        <vk-grid gutter="small" divided class="uk-child-width-1-4@m">
          <div><panel>First</panel></div>
          <div class="uk-flex-last"><panel>Second</panel></div>
          <div><panel>Third</panel></div>
          <div class="uk-flex-first"><panel>Last</panel></div>
        </vk-grid>

      </div>
      <div>

        <vk-grid gutter="small" divided class="uk-child-width-1-4@m">
          <div class="uk-flex-last"><panel>First</panel></div>
          <div><panel>Second</panel></div>
          <div><panel>Third</panel></div>
          <div class="uk-flex-first"><panel>Last</panel></div>
        </vk-grid>

      </div>
    </vk-grid>

    <h3>Wrap + Order</h3>

    <vk-grid divided class="uk-child-width-1-4@m">
      <div>

        <vk-grid gutter="small" divided class="uk-child-width-1-2@m uk-flex-middle">
          <div><panel>First</panel></div>
          <div><panel>Last<br>...<br>...</panel></div>
          <div><panel>Wrap</panel></div>
        </vk-grid>

      </div>
      <div>

        <vk-grid gutter="small" divided class="uk-child-width-1-2@m uk-flex-middle">
          <div><panel>First</panel></div>
          <div class="uk-flex-first"><panel>Last<br>...<br>...</panel></div>
          <div><panel>Wrap</panel></div>
        </vk-grid>

      </div>
      <div>

        <vk-grid gutter="small" divided class="uk-child-width-1-2@m uk-flex-middle">
          <div><panel>First<br>...<br>...</panel></div>
          <div class="uk-flex-first"><panel>Last</panel></div>
          <div><panel>Wrap</panel></div>
        </vk-grid>

      </div>
      <div>

        <vk-grid gutter="small" divided class="uk-child-width-1-2@m uk-flex-middle">
          <div class="uk-flex-last"><panel>First</panel></div>
          <div><panel>Last<br>...<br>...</panel></div>
          <div><panel>Wrap</panel></div>
        </vk-grid>

      </div>
    </vk-grid>

    <vk-grid divided class="uk-child-width-1-2@m">
      <div>

        <h3>Stack</h3>

        <vk-grid gutter="small" divided class="uk-child-width-1-1">
          <div><panel>First</panel></div>
          <div><panel>Second</panel></div>
          <div class="uk-flex-first"><panel>Last</panel></div>
        </vk-grid>

      </div>
      <div>

        <h3>Align</h3>

        <vk-grid gutter="small" divided class="uk-child-width-1-4@s uk-flex-center">
          <div class="uk-flex-last"><panel>First</panel></div>
          <div><panel>Second</panel></div>
          <div><panel>Third</panel></div>
          <div><panel>Forth</panel></div>
          <div class="uk-flex-first"><panel>Fifth</panel></div>
          <div><panel>Last</panel></div>
        </vk-grid>

      </div>
    </vk-grid>

  </div>
</template>

<script>
import Panel from './_panel'
import GridDemo from './_grid'
import GridDividerDemo from './_divider'

export default {
  components: {
    GridDemo,
    GridDividerDemo,
    Panel
  }
}
</script>

<style scoped>
.uk-panel {
  padding: 10px;
  text-align: center;
}

:nth-child(10n-9) > .uk-panel { background: rgba(0,0,0,0.1); }
:nth-child(10n-8) > .uk-panel { background: rgba(0,0,0,0.15); }
:nth-child(10n-7) > .uk-panel { background: rgba(0,0,0,0.2); }
:nth-child(10n-6) > .uk-panel { background: rgba(0,0,0,0.25); }
:nth-child(10n-5) > .uk-panel { background: rgba(0,0,0,0.3); }
:nth-child(10n-4) > .uk-panel { background: rgba(0,0,0,0.35); }
:nth-child(10n-3) > .uk-panel { background: rgba(0,0,0,0.40); }
:nth-child(10n-2) > .uk-panel { background: rgba(0,0,0,0.45); }
:nth-child(10n-1) > .uk-panel { background: rgba(0,0,0,0.50); }
:nth-child(10n) > .uk-panel { background: rgba(0,0,0,0.55); }
</style>
