<template>
  <div>
    <div class="uk-child-width-1-3@m" uk-grid>
      <div>
        <h2>Objects</h2>
        <p uk-margin>
          <vk-button @click="show.def = true">Default</vk-button>
          <vk-button @click="show.sections = true">Sections</vk-button>
          <vk-button @click="show.nobody = true">No body</vk-button>
          <vk-button @click="show.caption = true">Caption</vk-button>
          <vk-button @click="show.closeoutside = true">Close Outside</vk-button>
          <vk-button @click="show.lightbox = true">Lightbox</vk-button>
        </p>
      </div>
      <div>
        <h2>Scrollbar</h2>
        <p uk-margin>
          <vk-button @click="show.scrollbar = true">Scrollbar</vk-button>
          <vk-button @click="show.overflow = true">Overflow Auto</vk-button>
        </p>
      </div>
      <div>
        <h2>Sizes</h2>
        <p uk-margin>
          <vk-button @click="show.container = true">Container</vk-button>
          <vk-button @click="show.widths = true">Widths</vk-button>
          <vk-button @click="show.full = true">Full</vk-button>
          <vk-button @click="show.fullsplit = true">Full Split</vk-button>
        </p>
      </div>
      <div>
        <h2>Center</h2>
        <p uk-margin>
          <vk-button @click="show.center = true">Center</vk-button>
          <vk-button @click="show.centerwsb = true">With Scrollbar</vk-button>
        </p>
      </div>
      <div>
        <h2>Group</h2>
        <p uk-margin>
          <vk-button @click="show.group1 = true">Modal 1</vk-button>
          <vk-button @click="show.group2 = true">Modal 2</vk-button>
        </p>
      </div>
    </div>

    <vk-modal
      :show="show.def"
      @clickOut="show.def = false"
      @inactive="show.def = false"
      @keyEsc="show.def = false">
      <vk-modal-body>{{ lorem }}</vk-modal-body>
    </vk-modal>

    <vk-modal
      :show="show.sections"
      @clickOut="show.sections = false"
      @inactive="show.sections = false"
      @keyEsc="show.sections = false">
      <vk-modal-close @click="show.sections = false" />
      <vk-modal-header>
        <h2 class="uk-modal-title">Headline</h2>
      </vk-modal-header>
      <vk-modal-body>{{ lorem }}</vk-modal-body>
      <vk-modal-footer class="uk-text-right">
        <vk-button class="uk-button-default" @click="show.sections = false">Cancel</vk-button>
        <vk-button class="uk-button-primary">Save</vk-button>
      </vk-modal-footer>
    </vk-modal>

    <vk-modal
      :show="show.nobody"
      @clickOut="show.nobody = false"
      @inactive="show.nobody = false"
      @keyEsc="show.nobody = false">
      <vk-modal-close outside @click="show.nobody = false" />
      <img src="static/photo.jpg" alt="">
    </vk-modal>

    <vk-modal
      :show="show.caption"
      @clickOut="show.caption = false"
      @inactive="show.caption = false"
      @keyEsc="show.caption = false">
      <vk-modal-close @click="show.caption = false" />
      <vk-modal-body>{{ lorem }}</vk-modal-body>
      <vk-modal-caption>Caption</vk-modal-caption>
    </vk-modal>

    <vk-modal
      :show="show.closeoutside"
      @clickOut="show.closeoutside = false"
      @inactive="show.closeoutside = false"
      @keyEsc="show.closeoutside = false">
      <vk-modal-close outside @click="show.closeoutside = false" />
      <vk-modal-body>{{ lorem }}</vk-modal-body>
    </vk-modal>

    <vk-modal lightbox
      :show="show.lightbox"
      @clickOut="show.lightbox = false"
      @inactive="show.lightbox = false"
      @keyEsc="show.lightbox = false">
      <vk-modal-close top @click="show.lightbox = false" />
      <img src="static/photo.jpg" alt="">
      <vk-modal-caption bottom>Caption</vk-modal-caption>
    </vk-modal>

    <vk-modal
      :show="show.scrollbar"
      @clickOut="show.scrollbar = false"
      @inactive="show.scrollbar = false"
      @keyEsc="show.scrollbar = false">
      <vk-modal-close @click="show.scrollbar = false" />
      <vk-modal-body>
        <p v-for="n in 10">{{ lorem }}</p>
      </vk-modal-body>
    </vk-modal>

    <vk-modal container
      :show="show.overflow"
      @clickOut="show.overflow = false"
      @inactive="show.overflow = false"
      @keyEsc="show.overflow = false">
      <vk-modal-close @click="show.overflow = false" />
      <vk-modal-header>
        <h2 class="uk-modal-title">Headline</h2>
      </vk-modal-header>
      <vk-modal-body uk-overflow-auto>
        <p v-for="n in 10">{{ lorem }}</p>
      </vk-modal-body>
      <vk-modal-footer class="uk-text-right">
        <vk-button class="uk-button-default" @click="show.overflow = false">Cancel</vk-button>
        <vk-button class="uk-button-primary">Save</vk-button>
      </vk-modal-footer>
    </vk-modal>

    <vk-modal container
      :show="show.container"
      @clickOut="show.container = false"
      @inactive="show.container = false"
      @keyEsc="show.container = false">
      <vk-modal-close @click="container.full = false" />
      <vk-modal-body>
        <p>{{ lorem }}</p>
      </vk-modal-body>
    </vk-modal>

    <vk-modal widths="3-4@m 2-3@l 1-2@xl"
      :show="show.widths"
      @clickOut="show.widths = false"
      @inactive="show.widths = false"
      @keyEsc="show.widths = false">
      <vk-modal-dialog class="uk-width-3-4@m uk-width-2-3@l uk-width-1-2@xl">
        <vk-modal-close @click="widths.full = false"/>
        <vk-modal-body>
          <p>{{ lorem }}</p>
        </vk-modal-body>
      </vk-modal-dialog>
    </vk-modal>

    <vk-modal full
      :show="show.full"
      @clickOut="show.full = false"
      @inactive="show.full = false"
      @keyEsc="show.full = false">
      <vk-modal-dialog class="uk-flex uk-flex-center uk-flex-middle" uk-height-viewport>
        <vk-modal-close @click="show.full = false" />
        <div class="uk-width-xxlarge uk-padding-large">
          <h1>Headline</h1>
          <p>{{ lorem }}</p>
        </div>
      </vk-modal-dialog>
    </vk-modal>

    <vk-modal full
      :show="show.fullsplit"
      @clickOut="show.fullsplit = false"
      @inactive="show.fullsplit = false"
      @keyEsc="show.fullsplit = false">
        <vk-modal-close @click="show.fullsplit = false" />
        <div class="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle" uk-grid>
          <div class="uk-background-cover" style="background-image: url('static/photo.jpg');" uk-height-viewport></div>
          <div class="uk-padding-large">
            <h1>Headline</h1>
            <p>{{ lorem }}</p>
          </div>
        </div>
      </vk-modal-dialog>
    </vk-modal>

    <vk-modal center
      :show="show.center"
      @clickOut="show.center = false"
      @inactive="show.center = false"
      @keyEsc="show.center = false">
        <vk-modal-close outside @click="show.center = false" />
        <img src="static/photo.jpg" alt="">
      </vk-modal-dialog>
    </vk-modal>

    <vk-modal center
      :show="show.centerwsb"
      @clickOut="show.centerwsb = false"
      @inactive="show.centerwsb = false"
      @keyEsc="show.centerwsb = false">
      <vk-modal-close @click="show.centerwsb = false" />
      <vk-modal-body>
        <p v-for="n in 10">{{ lorem }}</p>
      </vk-modal-body>
    </vk-modal>

    <vk-modal
      :show="show.group1"
      @clickOut="show.group1 = false"
      @inactive="show.group1 = false"
      @keyEsc="show.group1 = false">
      <vk-modal-close @click="show.group1 = false" />
      <vk-modal-header>
        <h2 class="uk-modal-title">Headline 1</h2>
      </vk-modal-header>
      <vk-modal-body>{{ lorem }}</vk-modal-body>
      <vk-modal-footer class="uk-text-right">
        <vk-button class="uk-button-default" @click="show.group1 = false">Cancel</vk-button>
        <vk-button class="uk-button-primary" @click="show.group2 = true">Next</vk-button>
      </vk-modal-footer>
    </vk-modal>

    <vk-modal
      :show="show.group2"
      @clickOut="show.group2 = false"
      @inactive="show.group2 = false"
      @keyEsc="show.group2 = false">
      <vk-modal-close @click="show.group2 = false" />
      <vk-modal-header>
        <h2 class="uk-modal-title">Headline 2</h2>
      </vk-modal-header>
      <vk-modal-body>{{ lorem }}</vk-modal-body>
      <vk-modal-footer class="uk-text-right">
        <vk-button class="uk-button-default" @click="show.group2 = false">Cancel</vk-button>
        <vk-button class="uk-button-primary" @click="show.group1 = true">Previous</vk-button>
      </vk-modal-footer>
    </vk-modal>

  </div>
</template>

<script>
export default {
  data: () => ({
    show: {
      def: false,
      sections: false,
      nobody: false,
      caption: false,
      closeoutside: false,
      lightbox: false,
      scrollbar: false,
      overflow: false,
      container: false,
      widths: false,
      full: false,
      fullsplit: false,
      center: false,
      centerwsb: false,
      group1: false,
      group2: false
    },
    lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  })
}
</script>
