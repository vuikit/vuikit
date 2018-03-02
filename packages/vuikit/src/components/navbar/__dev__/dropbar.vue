<template>
  <div class="uk-padding">

    <h1>Dropbar</h1>

    <vk-navbar-dropbar class="uk-margin" mode="push">
      <vk-navbar container>
        <vk-navbar-nav slot="left">
          <vk-navbar-dropdown title="Click" mode="click">
            <vk-navbar-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-dropdown-nav>
          </vk-navbar-dropdown>

          <vk-navbar-dropdown title="2 Columns">
            <vk-navbar-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-dropdown-nav>
            <vk-navbar-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-dropdown-nav>
          </vk-navbar-dropdown>

          <vk-navbar-dropdown title="3 Columns">
            <vk-navbar-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-dropdown-nav>
            <vk-navbar-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-dropdown-nav>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </vk-navbar-dropdown>

          <vk-navbar-dropdown title="Justify" justified>
            <vk-navbar-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-dropdown-nav>
            <vk-navbar-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-dropdown-nav>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </vk-navbar-dropdown>

        </vk-navbar-nav>

        <vk-navbar-nav slot="right">
          <vk-navbar-dropdown title="Right">
            <vk-navbar-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-dropdown-nav>
          </vk-navbar-dropdown>
        </vk-navbar-nav>

      </vk-navbar>
    </vk-navbar-dropbar>

    <vk-navbar-dropbar class="uk-margin">
      <vk-navbar container>
        <vk-navbar-nav slot="left">
          <vk-navbar-dropdown title="Click" mode="click">
            <vk-navbar-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-dropdown-nav>
          </vk-navbar-dropdown>

          <vk-navbar-dropdown title="2 Columns">
            <vk-navbar-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-dropdown-nav>
            <vk-navbar-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-dropdown-nav>
          </vk-navbar-dropdown>

          <vk-navbar-dropdown title="3 Columns">
            <vk-navbar-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-dropdown-nav>
            <vk-navbar-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-dropdown-nav>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </vk-navbar-dropdown>

          <vk-navbar-dropdown title="Justify" justified>
            <vk-navbar-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-dropdown-nav>
            <vk-navbar-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-dropdown-nav>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </vk-navbar-dropdown>

        </vk-navbar-nav>

        <vk-navbar-nav slot="right">
          <vk-navbar-dropdown title="Right">
            <vk-navbar-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-dropdown-nav>
          </vk-navbar-dropdown>
        </vk-navbar-nav>

      </vk-navbar>
    </vk-navbar-dropbar>

  </div>
</template>

<script>
export default {
  components: {
    NavItemsDemo: {
      functional: true,
      render: h => {
        return [
          h('vk-nav-item', { props: { title: 'Active', active: true } }),
          h('vk-nav-item', { props: { title: 'Parent' } }),
          h('vk-nav-item-header', { props: { title: 'Header' } }),
          h('vk-nav-item', { props: { title: 'Item', icon: 'table' } }),
          h('vk-nav-item', { props: { title: 'Item', icon: 'thumbnails' } }),
          h('vk-nav-item-divider'),
          h('vk-nav-item', { props: { title: 'Item', icon: 'trash' } })
        ]
      }
    }
  }
}
</script>
