<template>
  <div class="uk-margin-top">

    <div class="uk-section uk-section-default uk-section-small uk-padding-remove-top">
      <div class="uk-container">

        <h1>Card</h1>

        <vk-grid matched class="uk-child-width-1-4@m">
          <div>

            <vk-card hover>
              <template slot="badge">Hot</template>
              <div>
                <vk-card-title>Default</vk-card-title>
                <p>Lorem ipsum <a href="#">dolor</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p v-vk-margin>
                  <a class="uk-button uk-button-default" href="#">Button</a>
                  <a class="uk-button uk-button-text uk-margin-small-left" href="#">Button</a>
                </p>
              </div>
            </vk-card>

          </div>
          <div>

            <vk-card hover type="primary">
              <template slot="badge">Hot</template>
              <div>
                <vk-card-title>Hover</vk-card-title>
                <p>Lorem ipsum <a href="#">dolor</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p v-vk-margin>
                  <a class="uk-button uk-button-default" href="#">Button</a>
                  <a class="uk-button uk-button-text uk-margin-small-left" href="#">Button</a>
                </p>
              </div>
            </vk-card>

          </div>
          <div>

            <vk-card hover type="secondary">
              <template slot="badge">Hot</template>
              <div>
                <vk-card-title>Secondary</vk-card-title>
                <p>Lorem ipsum <a href="#">dolor</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p v-vk-margin>
                  <a class="uk-button uk-button-default" href="#">Button</a>
                  <a class="uk-button uk-button-text uk-margin-small-left" href="#">Button</a>
                </p>
              </div>
            </vk-card>

          </div>
          <div>

            <vk-card hover :type="false">
              <template slot="badge">Hot</template>
              <div>
                <vk-card-title>Blank</vk-card-title>
                <p>Lorem ipsum <a href="#">dolor</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p v-vk-margin>
                  <a class="uk-button uk-button-default" href="#">Button</a>
                  <a class="uk-button uk-button-text uk-margin-small-left" href="#">Button</a>
                </p>
              </div>
            </vk-card>

          </div>
        </vk-grid>

      </div>
    </div>

    <div class="uk-container uk-margin-large-top">

      <h2>Header and Footer</h2>

      <vk-grid class="uk-child-width-1-4@m">
        <div>

          <vk-card>
            <div slot="header">
              <vk-card-title>Title</vk-card-title>
            </div>
            <div slot="body">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div slot="footer">
              <p class="uk-text-meta">Written by <a href="#">Super User</a> on <time datetime="2016-04-01T19:00">April 01, 2016</time>.</p>
            </div>
          </vk-card>

        </div>
        <div>

          <vk-card>
            <div slot="media-top">
              <img src="/light.jpg" alt="">
            </div>
            <div slot="body">
              <vk-card-title>Title</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            </div>
            <div slot="footer">
              <p>
                <a class="uk-button uk-button-primary" href="#">Button</a>
                <a class="uk-button uk-button-text uk-margin-small-left" href="#">Button</a>
              </p>
            </div>
          </vk-card>

        </div>
        <div>

          <vk-card>
            <div slot="header">
              <vk-card-title>Title</vk-card-title>
            </div>
            <div slot="body">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            </div>
            <div slot="media-bottom">
              <img src="/dark.jpg" alt="">
            </div>
          </vk-card>

        </div>
        <div>

          <vk-card>
            <div slot="header">
              <div class="uk-grid-small uk-flex-middle" uk-grid>
                <div class="uk-width-auto">
                  <img class="uk-border-circle" src="/avatar.jpg" width="50" alt="">
                </div>
                <div  class="uk-width-expand">
                  <h3 class="uk-card-title uk-margin-remove-bottom">Title</h3>
                  <p class="uk-text-meta uk-margin-remove-top"><time datetime="2016-04-01T19:00">April 01, 2016</time></p>
                </div>
              </div>
            </div>
            <div slot="media">
              <img src="/light.jpg" alt="">
            </div>
            <div slot="body">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            </div>
          </vk-card>

        </div>
      </vk-grid>

    </div>

  </div>
</template>
