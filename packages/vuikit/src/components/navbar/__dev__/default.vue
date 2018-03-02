<template>
  <div>
    <div class="uk-padding">

      <h1>Navbar</h1>

      <vk-grid>
        <div class="uk-width-2-3@m">

          <vk-navbar container class="uk-margin">
            <vk-navbar-nav slot="left">
              <vk-navbar-nav-item title="Active" active href="#" />
              <vk-navbar-dropdown title="Parent">
                <vk-navbar-dropdown-nav>
                  <vk-nav-item title="Active" active></vk-nav-item>
                  <vk-nav-item title="Item"></vk-nav-item>
                  <vk-nav-item title="Item"></vk-nav-item>
                </vk-navbar-dropdown-nav>
              </vk-navbar-dropdown>
              <vk-navbar-dropdown title="Content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </vk-navbar-dropdown>
              <vk-navbar-nav-item title="Item" href="#" />
              <vk-navbar-nav-item title="Item" href="#" />
            </vk-navbar-nav>
          </vk-navbar>

          <h2>Transparent</h2>

          <div class="uk-margin uk-position-relative uk-light">
            <canvas class="uk-background-cover" style="background-image: url('/dark.jpg')" width="1000" height="200"></canvas>
            <div class="uk-position-top">

              <vk-navbar container transparent>
                <vk-navbar-nav slot="left">
                  <vk-navbar-nav-item title="Active" active href="#" />
                  <vk-navbar-dropdown title="Parent">
                    <vk-navbar-dropdown-nav>
                      <vk-nav-item title="Active" active></vk-nav-item>
                      <vk-nav-item title="Item"></vk-nav-item>
                      <vk-nav-item title="Item"></vk-nav-item>
                    </vk-navbar-dropdown-nav>
                  </vk-navbar-dropdown>
                  <vk-navbar-nav-item title="Item" href="#" />
                  <vk-navbar-nav-item title="Item" href="#" />
                </vk-navbar-nav>
                <vk-navbar-item slot="right">
                  <div>Some <a href="#">Link</a></div>
                </vk-navbar-item>
                <vk-navbar-toggle slot="right" href="#"></vk-navbar-toggle>
              </vk-navbar>

            </div>
          </div>

          <div class="uk-margin uk-position-relative uk-dark">
            <canvas class="uk-background-cover" style="background-image: url('/light.jpg')" width="1000" height="200"></canvas>
            <div class="uk-position-top">

              <vk-navbar container transparent>
                <vk-navbar-nav slot="left">
                  <vk-navbar-nav-item title="Active" active href="#" />
                  <vk-navbar-dropdown title="Parent">
                    <vk-navbar-dropdown-nav>
                      <vk-nav-item title="Active" active></vk-nav-item>
                      <vk-nav-item title="Item"></vk-nav-item>
                      <vk-nav-item title="Item"></vk-nav-item>
                    </vk-navbar-dropdown-nav>
                  </vk-navbar-dropdown>
                  <vk-navbar-nav-item title="Item" href="#" />
                  <vk-navbar-nav-item title="Item" href="#" />
                </vk-navbar-nav>
                <vk-navbar-item slot="right">
                  <div>Some <a href="#">Link</a></div>
                </vk-navbar-item>
                <vk-navbar-toggle slot="right" href="#"></vk-navbar-toggle>
              </vk-navbar>

            </div>
          </div>

        </div>

      </vk-grid>

      <h2>Icons and Subtitles</h2>

      <vk-navbar container class="uk-margin">
        <vk-navbar-nav slot="left">
          <vk-navbar-nav-item title="Item" href="#"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Item" icon="trash" href="#"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Item" subtitle="Subtitle" href="#"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Item" subtitle="Subtitle" icon="trash" href="#"></vk-navbar-nav-item>
          <vk-navbar-nav-item icon="trash" href="#"></vk-navbar-nav-item>
        </vk-navbar-nav>
      </vk-navbar>

      <h2>Content Items</h2>

      <vk-navbar container class="uk-margin">
        <vk-navbar-nav slot="left">
          <vk-navbar-nav-item title="Item" href="#"></vk-navbar-nav-item>
        </vk-navbar-nav>
        <vk-navbar-item slot="left">
          <div>Some <a href="#">Link</a></div>
        </vk-navbar-item>
        <vk-navbar-item slot="left">
          <vk-icon-button href="#" icon="trash"></vk-icon-button>
        </vk-navbar-item>
        <vk-navbar-item slot="left">
          <img class="uk-logo uk-responsive-height" src="/photo.jpg" alt="">
        </vk-navbar-item>
        <vk-navbar-item slot="left">Search</vk-navbar-item>
        <vk-navbar-item slot="left">
          <form>
            <input class="uk-input uk-form-width-medium" type="text" placeholder="Input">
            <button class="uk-button uk-button-default">Button</button>
          </form>
        </vk-navbar-item>
      </vk-navbar>

      <h2>Toggle and Logo</h2>

      <vk-grid class="uk-child-width-1-2@m">
        <div>

          <vk-navbar container class="uk-margin">
            <vk-navbar-toggle slot="left" href="#"></vk-navbar-toggle>
            <vk-navbar-logo slot="right" href="#">Logo</vk-navbar-logo>
          </vk-navbar>

          <vk-navbar container class="uk-margin">
            <vk-navbar-toggle title="Menu" slot="left" href="#"></vk-navbar-toggle>
            <vk-navbar-toggle title="Menu" :icon="false" slot="right" href="#"></vk-navbar-toggle>
          </vk-navbar>

        </div>
      </vk-grid>

      <h2>Center</h2>

      <vk-navbar container class="uk-margin">
        <vk-navbar-nav slot="left">
          <vk-navbar-nav-item title="Left" href="#"></vk-navbar-nav-item>
        </vk-navbar-nav>

        <template slot="center">
          <vk-navbar-nav>
            <vk-navbar-nav-item title="Active" active href="#"></vk-navbar-nav-item>
            <vk-navbar-dropdown title="Parent">
              <vk-navbar-dropdown-nav>
                <vk-nav-item title="Active" active></vk-nav-item>
                <vk-nav-item title="Item"></vk-nav-item>
                <vk-nav-item title="Item"></vk-nav-item>
              </vk-navbar-dropdown-nav>
            </vk-navbar-dropdown>
            <vk-navbar-nav-item title="Content (TODO)" href="#"></vk-navbar-nav-item>
            <vk-navbar-nav-item title="Item" href="#"></vk-navbar-nav-item>
            <vk-navbar-nav-item title="Item" href="#"></vk-navbar-nav-item>
            <vk-navbar-nav-item title="Item" href="#"></vk-navbar-nav-item>
          </vk-navbar-nav>
          <vk-navbar-item>
            <div>Some <a href="#">Link</a></div>
          </vk-navbar-item>
        </template>

        <vk-navbar-nav slot="right">
          <vk-navbar-nav-item title="Right" href="#"></vk-navbar-nav-item>
        </vk-navbar-nav>
      </vk-navbar>

      <vk-navbar container class="uk-margin">
        <vk-navbar-nav slot="left">
          <vk-navbar-nav-item title="Left" href="#"></vk-navbar-nav-item>
        </vk-navbar-nav>

        <template slot="center-left">
          <vk-navbar-nav>
            <vk-navbar-nav-item title="Active" active href="#"></vk-navbar-nav-item>
            <vk-navbar-dropdown title="Parent">
              <vk-navbar-dropdown-nav>
                <vk-nav-item title="Active" active></vk-nav-item>
                <vk-nav-item title="Item"></vk-nav-item>
                <vk-nav-item title="Item"></vk-nav-item>
              </vk-navbar-dropdown-nav>
            </vk-navbar-dropdown>
            <vk-navbar-nav-item title="Content (TODO)" href="#"></vk-navbar-nav-item>
          </vk-navbar-nav>
        </template>

        <vk-navbar-logo slot="center" href="#">Logo</vk-navbar-logo>

        <template slot="center-right">
          <vk-navbar-nav>
            <vk-navbar-nav-item title="Active" active href="#"></vk-navbar-nav-item>
            <vk-navbar-dropdown title="Parent">
              <vk-navbar-dropdown-nav>
                <vk-nav-item title="Active" active></vk-nav-item>
                <vk-nav-item title="Item"></vk-nav-item>
                <vk-nav-item title="Item"></vk-nav-item>
              </vk-navbar-dropdown-nav>
            </vk-navbar-dropdown>
            <vk-navbar-nav-item title="Content (TODO)" href="#"></vk-navbar-nav-item>
          </vk-navbar-nav>
          <vk-navbar-item>
            <div>Some <a href="#">Link</a></div>
          </vk-navbar-item>
        </template>

        <vk-navbar-nav slot="right">
          <vk-navbar-nav-item title="Right" href="#"></vk-navbar-nav-item>
        </vk-navbar-nav>
      </vk-navbar>

      <h2>Layouts</h2>
    </div>

    <vk-navbar-full class="uk-margin">
      <template slot="left">
        <vk-navbar-logo href="#">Logo</vk-navbar-logo>
        <vk-navbar-nav>
          <vk-navbar-nav-item title="Active" active href="#"></vk-navbar-nav-item>
          <vk-navbar-dropdown title="Parent">
            <vk-navbar-dropdown-nav>
              <vk-nav-item title="Active" active></vk-nav-item>
              <vk-nav-item title="Item"></vk-nav-item>
              <vk-nav-item title="Item"></vk-nav-item>
            </vk-navbar-dropdown-nav>
          </vk-navbar-dropdown>
          <vk-navbar-nav-item title="Item" href="#"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Item" href="#"></vk-navbar-nav-item>
        </vk-navbar-nav>
      </template>
    </vk-navbar-full>

    <vk-navbar-full class="uk-margin">
      <template slot="left">
        <vk-navbar-logo href="#">Logo</vk-navbar-logo>
        <vk-navbar-nav>
          <vk-navbar-nav-item title="Active" active href="#"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Parent" href="#"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Item" href="#"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Item" href="#"></vk-navbar-nav-item>
        </vk-navbar-nav>
      </template>

      <template slot="right">
        <vk-navbar-nav>
          <vk-navbar-nav-item title="Active" active href="#"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Parent" href="#"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Item" href="#"></vk-navbar-nav-item>
        </vk-navbar-nav>
        <vk-navbar-item>
          <vk-grid tag="ul" gutter="small">
            <li>
              <vk-icon-button href="#" icon="trash"></vk-icon-button>
            </li>
            <li>
              <vk-icon-button href="#" icon="trash"></vk-icon-button>
            </li>
            <li>
              <vk-icon-button href="#" icon="trash"></vk-icon-button>
            </li>
          </vk-grid>
        </vk-navbar-item>
      </template>
    </vk-navbar-full>

    <vk-navbar-full class="uk-margin">
      <template slot="left">
        <vk-navbar-logo href="#">Logo</vk-navbar-logo>
      </template>

      <template slot="center">
        <vk-navbar-nav>
          <vk-navbar-nav-item title="Active" active href="#"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Parent" href="#"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Item" href="#"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Item" href="#"></vk-navbar-nav-item>
        </vk-navbar-nav>
      </template>

      <template slot="right">
        <vk-navbar-item>
          <vk-grid tag="ul" gutter="small">
            <li>
              <vk-icon-button href="#" icon="trash"></vk-icon-button>
            </li>
            <li>
              <vk-icon-button href="#" icon="trash"></vk-icon-button>
            </li>
            <li>
              <vk-icon-button href="#" icon="trash"></vk-icon-button>
            </li>
          </vk-grid>
        </vk-navbar-item>
      </template>
    </vk-navbar-full>

    <!-- expanded -->
    <vk-navbar-full expanded class="uk-margin">
      <template slot="left">
        <vk-navbar-logo href="#">Logo</vk-navbar-logo>
        <vk-navbar-nav>
          <vk-navbar-nav-item title="Active" active href="#"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Parent" href="#"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Item" href="#"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Item" href="#"></vk-navbar-nav-item>
        </vk-navbar-nav>
      </template>
    </vk-navbar-full>

    <vk-navbar-full expanded class="uk-margin">
      <template slot="left">
        <vk-navbar-logo href="#">Logo</vk-navbar-logo>
        <vk-navbar-nav>
          <vk-navbar-nav-item title="Active" active href="#"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Parent" href="#"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Item" href="#"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Item" href="#"></vk-navbar-nav-item>
        </vk-navbar-nav>
      </template>

      <template slot="right">
        <vk-navbar-nav>
          <vk-navbar-nav-item title="Active" active href="#"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Parent" href="#"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Item" href="#"></vk-navbar-nav-item>
        </vk-navbar-nav>
        <vk-navbar-item>
          <vk-grid tag="ul" gutter="small">
            <li>
              <vk-icon-button href="#" icon="trash"></vk-icon-button>
            </li>
            <li>
              <vk-icon-button href="#" icon="trash"></vk-icon-button>
            </li>
            <li>
              <vk-icon-button href="#" icon="trash"></vk-icon-button>
            </li>
          </vk-grid>
        </vk-navbar-item>
      </template>
    </vk-navbar-full>

    <vk-navbar-full expanded class="uk-margin">
      <template slot="left">
        <vk-navbar-logo href="#">Logo</vk-navbar-logo>
      </template>

      <template slot="center">
        <vk-navbar-nav>
          <vk-navbar-nav-item title="Active" active href="#"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Parent" href="#"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Item" href="#"></vk-navbar-nav-item>
          <vk-navbar-nav-item title="Item" href="#"></vk-navbar-nav-item>
        </vk-navbar-nav>
      </template>

      <template slot="right">
        <vk-navbar-item>
          <vk-grid tag="ul" gutter="small">
            <li>
              <vk-icon-button href="#" icon="trash"></vk-icon-button>
            </li>
            <li>
              <vk-icon-button href="#" icon="trash"></vk-icon-button>
            </li>
            <li>
              <vk-icon-button href="#" icon="trash"></vk-icon-button>
            </li>
          </vk-grid>
        </vk-navbar-item>
      </template>
    </vk-navbar-full>

  </div>
</template>
