<template>
  <div class="uk-padding">

    <h1>Dropbar</h1>

    <vk-navbar-dropbar class="uk-margin">
      <vk-navbar>
        <vk-navbar-nav>
          <vk-navbar-nav-dropdown title="Click" mode="click">
            <vk-navbar-nav-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-nav-dropdown-nav>
          </vk-navbar-nav-dropdown>

          <vk-navbar-nav-dropdown title="2 Columns">
            <vk-navbar-nav-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-nav-dropdown-nav>
            <vk-navbar-nav-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-nav-dropdown-nav>
          </vk-navbar-nav-dropdown>

          <vk-navbar-nav-dropdown title="3 Columns">
            <vk-navbar-nav-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-nav-dropdown-nav>
            <vk-navbar-nav-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-nav-dropdown-nav>
            <div>
              <lorem-ipsum />
            </div>
          </vk-navbar-nav-dropdown>

          <vk-navbar-nav-dropdown title="Justify" justified>
            <vk-navbar-nav-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-nav-dropdown-nav>
            <vk-navbar-nav-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-nav-dropdown-nav>
            <div>
              <lorem-ipsum />
            </div>
          </vk-navbar-nav-dropdown>

        </vk-navbar-nav>

        <vk-navbar-nav slot="right">
          <vk-navbar-nav-dropdown title="Right">
            <vk-navbar-nav-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-nav-dropdown-nav>
          </vk-navbar-nav-dropdown>
        </vk-navbar-nav>

      </vk-navbar>
    </vk-navbar-dropbar>

    <h2>Push</h2>
    <vk-navbar-dropbar class="uk-margin" mode="push">
      <vk-navbar>
        <vk-navbar-nav>
          <vk-navbar-nav-dropdown title="Click" mode="click">
            <vk-navbar-nav-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-nav-dropdown-nav>
          </vk-navbar-nav-dropdown>

          <vk-navbar-nav-dropdown title="2 Columns">
            <vk-navbar-nav-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-nav-dropdown-nav>
            <vk-navbar-nav-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-nav-dropdown-nav>
          </vk-navbar-nav-dropdown>

          <vk-navbar-nav-dropdown title="3 Columns">
            <vk-navbar-nav-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-nav-dropdown-nav>
            <vk-navbar-nav-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-nav-dropdown-nav>
            <div>
              <lorem-ipsum />
            </div>
          </vk-navbar-nav-dropdown>

          <vk-navbar-nav-dropdown title="Justify" justified>
            <vk-navbar-nav-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-nav-dropdown-nav>
            <vk-navbar-nav-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-nav-dropdown-nav>
            <div>
              <lorem-ipsum />
            </div>
          </vk-navbar-nav-dropdown>

        </vk-navbar-nav>

        <vk-navbar-nav slot="right">
          <vk-navbar-nav-dropdown title="Right">
            <vk-navbar-nav-dropdown-nav>
              <nav-items-demo />
            </vk-navbar-nav-dropdown-nav>
          </vk-navbar-nav-dropdown>
        </vk-navbar-nav>

      </vk-navbar>
    </vk-navbar-dropbar>

    <lorem-ipsum />
    <div style="height: 400px"></div>

  </div>
</template>

<script>
export default {
  components: {
    LoremIpsum: {
      functional: true,
      render (h) {
        return h('span', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
      }
    },
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
