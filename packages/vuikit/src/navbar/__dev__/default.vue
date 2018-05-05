<template>
  <div>
    <div class="uk-padding uk-container">

      <h1>Navbar</h1>

      <vk-grid>
        <div class="uk-width-2-3@m">

          <vk-navbar class="uk-margin">
            <vk-navbar-nav>
              <vk-navbar-nav-item title="Active" active />
              <vk-navbar-nav-dropdown title="Parent">
                <vk-navbar-nav-dropdown-nav>
                  <parent-items />
                </vk-navbar-nav-dropdown-nav>
              </vk-navbar-nav-dropdown>
              <vk-navbar-nav-dropdown title="Content">
                <lorem-ipsum />
              </vk-navbar-nav-dropdown>
              <vk-navbar-nav-item title="Item" />
              <vk-navbar-nav-item title="Item" />
            </vk-navbar-nav>
          </vk-navbar>

          <h2>Transparent</h2>

          <div class="uk-margin uk-position-relative uk-light">
            <canvas class="uk-background-cover" style="background-image: url('/dark.jpg')" width="1000" height="200"></canvas>
            <div class="uk-position-top">

              <vk-navbar transparent>
                <vk-navbar-nav>
                  <vk-navbar-nav-item title="Active" active />
                  <vk-navbar-nav-dropdown title="Parent">
                    <vk-navbar-nav-dropdown-nav>
                      <parent-items />
                    </vk-navbar-nav-dropdown-nav>
                  </vk-navbar-nav-dropdown>
                  <vk-navbar-nav-item title="Item" />
                  <vk-navbar-nav-item title="Item" />
                </vk-navbar-nav>
                <vk-navbar-item slot="right">
                  <div>Some <a>Link</a></div>
                </vk-navbar-item>
                <vk-navbar-toggle slot="right"></vk-navbar-toggle>
              </vk-navbar>

            </div>
          </div>

          <div class="uk-margin uk-position-relative uk-dark">
            <canvas class="uk-background-cover" style="background-image: url('/light.jpg')" width="1000" height="200"></canvas>
            <div class="uk-position-top">

              <vk-navbar transparent>
                <vk-navbar-nav>
                  <vk-navbar-nav-item title="Active" active />
                  <vk-navbar-nav-dropdown title="Parent">
                    <vk-navbar-nav-dropdown-nav>
                      <parent-items />
                    </vk-navbar-nav-dropdown-nav>
                  </vk-navbar-nav-dropdown>
                  <vk-navbar-nav-item title="Item" />
                  <vk-navbar-nav-item title="Item" />
                </vk-navbar-nav>
                <vk-navbar-item slot="right">
                  <div>Some <a>Link</a></div>
                </vk-navbar-item>
                <vk-navbar-toggle slot="right"></vk-navbar-toggle>
              </vk-navbar>

            </div>
          </div>

        </div>

      </vk-grid>

      <h2>Icons and Subtitles</h2>

      <vk-navbar class="uk-margin">
        <vk-navbar-nav>
          <vk-navbar-nav-item title="Item"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Item" icon="trash"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Item" subtitle="Subtitle"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Item" subtitle="Subtitle" icon="trash"></vk-navbar-nav-item>
          <vk-navbar-nav-item icon="trash"></vk-navbar-nav-item>
        </vk-navbar-nav>
      </vk-navbar>

      <h2>Content Items</h2>

      <vk-navbar class="uk-margin">
        <vk-navbar-nav>
          <vk-navbar-nav-item title="Item"></vk-navbar-nav-item>
        </vk-navbar-nav>
        <vk-navbar-item>
          <div>Some <a>Link</a></div>
        </vk-navbar-item>
        <vk-navbar-item>
          <vk-icon-button icon="trash"></vk-icon-button>
        </vk-navbar-item>
        <vk-navbar-item>
          <img class="uk-logo uk-responsive-height" src="/photo.jpg" alt="">
        </vk-navbar-item>
        <vk-navbar-item>Search</vk-navbar-item>
        <vk-navbar-item>
          <form>
            <input class="uk-input uk-form-width-medium" type="text" placeholder="Input">
            <button class="uk-button uk-button-default">Button</button>
          </form>
        </vk-navbar-item>
      </vk-navbar>

      <h2>Toggle and Logo</h2>

      <vk-grid class="uk-child-width-1-2@m">
        <div>

          <vk-navbar class="uk-margin">
            <vk-navbar-toggle></vk-navbar-toggle>
            <vk-navbar-logo slot="right">Logo</vk-navbar-logo>
          </vk-navbar>

          <vk-navbar class="uk-margin">
            <vk-navbar-toggle title="Menu"></vk-navbar-toggle>
            <vk-navbar-toggle title="Menu" :icon="false" slot="right"></vk-navbar-toggle>
          </vk-navbar>

        </div>
      </vk-grid>

      <h2>Center</h2>

      <vk-navbar class="uk-margin">
        <vk-navbar-nav>
          <vk-navbar-nav-item title="Left"></vk-navbar-nav-item>
        </vk-navbar-nav>

        <template slot="center">
          <vk-navbar-nav>
            <vk-navbar-nav-item title="Active" active></vk-navbar-nav-item>
            <vk-navbar-nav-dropdown title="Parent">
              <vk-navbar-nav-dropdown-nav>
                <parent-items />
              </vk-navbar-nav-dropdown-nav>
            </vk-navbar-nav-dropdown>
            <vk-navbar-nav-dropdown title="Content">
              <lorem-ipsum />
            </vk-navbar-nav-dropdown>
            <vk-navbar-nav-item title="Item"></vk-navbar-nav-item>
            <vk-navbar-nav-item title="Item"></vk-navbar-nav-item>
            <vk-navbar-nav-item title="Item"></vk-navbar-nav-item>
          </vk-navbar-nav>
          <vk-navbar-item>
            <div>Some <a>Link</a></div>
          </vk-navbar-item>
        </template>

        <vk-navbar-nav slot="right">
          <vk-navbar-nav-item title="Right"></vk-navbar-nav-item>
        </vk-navbar-nav>
      </vk-navbar>

      <vk-navbar class="uk-margin">
        <vk-navbar-nav>
          <vk-navbar-nav-item title="Left"></vk-navbar-nav-item>
        </vk-navbar-nav>

        <template slot="center-left">
          <vk-navbar-nav>
            <vk-navbar-nav-item title="Active" active></vk-navbar-nav-item>
            <vk-navbar-nav-dropdown title="Parent">
              <vk-navbar-nav-dropdown-nav>
                <parent-items />
              </vk-navbar-nav-dropdown-nav>
            </vk-navbar-nav-dropdown>
            <vk-navbar-nav-dropdown title="Content">
              <lorem-ipsum />
            </vk-navbar-nav-dropdown>
          </vk-navbar-nav>
        </template>

        <vk-navbar-logo slot="center">Logo</vk-navbar-logo>

        <template slot="center-right">
          <vk-navbar-nav>
            <vk-navbar-nav-item title="Active" active></vk-navbar-nav-item>
            <vk-navbar-nav-dropdown title="Parent">
              <vk-navbar-nav-dropdown-nav>
                <parent-items />
              </vk-navbar-nav-dropdown-nav>
            </vk-navbar-nav-dropdown>
            <vk-navbar-nav-dropdown title="Content">
              <lorem-ipsum />
            </vk-navbar-nav-dropdown>
          </vk-navbar-nav>
          <vk-navbar-item>
            <div>Some <a>Link</a></div>
          </vk-navbar-item>
        </template>

        <vk-navbar-nav slot="right">
          <vk-navbar-nav-item title="Right"></vk-navbar-nav-item>
        </vk-navbar-nav>
      </vk-navbar>

      <h2>Layouts</h2>
    </div>

    <vk-navbar-full class="uk-margin">
      <vk-navbar-logo>Logo</vk-navbar-logo>
      <vk-navbar-nav>
        <vk-navbar-nav-item title="Active" active></vk-navbar-nav-item>
        <vk-navbar-nav-dropdown title="Parent">
          <vk-navbar-nav-dropdown-nav>
            <parent-items />
          </vk-navbar-nav-dropdown-nav>
        </vk-navbar-nav-dropdown>
        <vk-navbar-nav-item title="Item"></vk-navbar-nav-item>
        <vk-navbar-nav-item title="Item"></vk-navbar-nav-item>
      </vk-navbar-nav>
    </vk-navbar-full>

    <vk-navbar-full class="uk-margin">
      <vk-navbar-logo>Logo</vk-navbar-logo>
      <vk-navbar-nav>
        <vk-navbar-nav-item title="Active" active></vk-navbar-nav-item>
        <vk-navbar-nav-dropdown title="Parent">
          <vk-navbar-nav-dropdown-nav>
            <parent-items />
          </vk-navbar-nav-dropdown-nav>
        </vk-navbar-nav-dropdown>
        <vk-navbar-nav-item title="Item"></vk-navbar-nav-item>
        <vk-navbar-nav-item title="Item"></vk-navbar-nav-item>
      </vk-navbar-nav>

      <template slot="right">
        <vk-navbar-nav>
          <vk-navbar-nav-item title="Active" active></vk-navbar-nav-item>
          <vk-navbar-nav-dropdown title="Parent">
            <vk-navbar-nav-dropdown-nav>
              <parent-items />
            </vk-navbar-nav-dropdown-nav>
          </vk-navbar-nav-dropdown>
          <vk-navbar-nav-item title="Item"></vk-navbar-nav-item>
        </vk-navbar-nav>
        <vk-navbar-item>
          <vk-grid tag="ul" gutter="small">
            <li>
              <vk-icon-button icon="trash"></vk-icon-button>
            </li>
            <li>
              <vk-icon-button icon="trash"></vk-icon-button>
            </li>
            <li>
              <vk-icon-button icon="trash"></vk-icon-button>
            </li>
          </vk-grid>
        </vk-navbar-item>
      </template>
    </vk-navbar-full>

    <vk-navbar-full class="uk-margin">
      <vk-navbar-logo>Logo</vk-navbar-logo>

      <template slot="center">
        <vk-navbar-nav>
          <vk-navbar-nav-item title="Active" active></vk-navbar-nav-item>
          <vk-navbar-nav-dropdown title="Parent">
            <vk-navbar-nav-dropdown-nav>
              <parent-items />
            </vk-navbar-nav-dropdown-nav>
          </vk-navbar-nav-dropdown>
          <vk-navbar-nav-item title="Item"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Item"></vk-navbar-nav-item>
        </vk-navbar-nav>
      </template>

      <template slot="right">
        <vk-navbar-item>
          <vk-grid tag="ul" gutter="small">
            <li>
              <vk-icon-button icon="trash"></vk-icon-button>
            </li>
            <li>
              <vk-icon-button icon="trash"></vk-icon-button>
            </li>
            <li>
              <vk-icon-button icon="trash"></vk-icon-button>
            </li>
          </vk-grid>
        </vk-navbar-item>
      </template>
    </vk-navbar-full>

    <vk-navbar-full expanded class="uk-margin">
      <vk-navbar-logo>Logo</vk-navbar-logo>
      <vk-navbar-nav>
        <vk-navbar-nav-item title="Active" active></vk-navbar-nav-item>
        <vk-navbar-nav-dropdown title="Parent">
          <vk-navbar-nav-dropdown-nav>
            <parent-items />
          </vk-navbar-nav-dropdown-nav>
        </vk-navbar-nav-dropdown>
        <vk-navbar-nav-item title="Item"></vk-navbar-nav-item>
        <vk-navbar-nav-item title="Item"></vk-navbar-nav-item>
      </vk-navbar-nav>
    </vk-navbar-full>

    <vk-navbar-full expanded class="uk-margin">
      <vk-navbar-logo>Logo</vk-navbar-logo>
      <vk-navbar-nav>
        <vk-navbar-nav-item title="Active" active></vk-navbar-nav-item>
        <vk-navbar-nav-dropdown title="Parent">
          <vk-navbar-nav-dropdown-nav>
            <parent-items />
          </vk-navbar-nav-dropdown-nav>
        </vk-navbar-nav-dropdown>
        <vk-navbar-nav-item title="Item"></vk-navbar-nav-item>
        <vk-navbar-nav-item title="Item"></vk-navbar-nav-item>
      </vk-navbar-nav>

      <template slot="right">
        <vk-navbar-nav>
          <vk-navbar-nav-item title="Active" active></vk-navbar-nav-item>
          <vk-navbar-nav-dropdown title="Parent">
            <vk-navbar-nav-dropdown-nav>
              <parent-items />
            </vk-navbar-nav-dropdown-nav>
          </vk-navbar-nav-dropdown>
          <vk-navbar-nav-item title="Item"></vk-navbar-nav-item>
        </vk-navbar-nav>
        <vk-navbar-item>
          <vk-grid tag="ul" gutter="small">
            <li>
              <vk-icon-button icon="trash"></vk-icon-button>
            </li>
            <li>
              <vk-icon-button icon="trash"></vk-icon-button>
            </li>
            <li>
              <vk-icon-button icon="trash"></vk-icon-button>
            </li>
          </vk-grid>
        </vk-navbar-item>
      </template>
    </vk-navbar-full>

    <vk-navbar-full expanded class="uk-margin">
      <vk-navbar-logo>Logo</vk-navbar-logo>

      <template slot="center">
        <vk-navbar-nav>
          <vk-navbar-nav-item title="Active" active></vk-navbar-nav-item>
          <vk-navbar-nav-dropdown title="Parent">
            <vk-navbar-nav-dropdown-nav>
              <parent-items />
            </vk-navbar-nav-dropdown-nav>
          </vk-navbar-nav-dropdown>
          <vk-navbar-nav-item title="Item"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Item"></vk-navbar-nav-item>
        </vk-navbar-nav>
      </template>

      <template slot="right">
        <vk-navbar-item>
          <vk-grid tag="ul" gutter="small">
            <li>
              <vk-icon-button icon="trash"></vk-icon-button>
            </li>
            <li>
              <vk-icon-button icon="trash"></vk-icon-button>
            </li>
            <li>
              <vk-icon-button icon="trash"></vk-icon-button>
            </li>
          </vk-grid>
        </vk-navbar-item>
      </template>
    </vk-navbar-full>

    <div style="height: 200px"></div>

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
    ParentItems: {
      functional: true,
      render: h => {
        return [
          h('vk-nav-item', { props: { title: 'Active', active: true } }),
          h('vk-nav-item', { props: { title: 'Item' } }),
          h('vk-nav-item', { props: { title: 'Item' } })
        ]
      }
    }
  }
}
</script>
