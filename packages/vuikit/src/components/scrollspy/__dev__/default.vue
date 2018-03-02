<template>
  <div class="uk-padding">

    <div class="uk-card uk-card-default uk-card-body test-fixed">
      <vk-card-title>Scrollspy Nav</vk-card-title>
      <vk-scrollspy-nav closest="li">
        <ul class="uk-nav uk-nav-default">
          <li><a href="#animation-repeat">Single</a></li>
          <li><a href="#animation-delay">Group</a></li>
          <li><a href="#animation-fade">Fade</a></li>
          <li><a href="#animation-scale-up">Scale Up</a></li>
          <li><a href="#animation-scale-down">Scale Down</a></li>
          <li><a href="#animation-slide-left">Slide Left</a></li>
          <li><a href="#animation-slide-right">Slide Right</a></li>
          <li><a href="#animation-slide-top">Slide Top</a></li>
          <li><a href="#animation-slide-bottom">Slide Bottom</a></li>
          <li><a href="#animation-different">Different Animations</a></li>
          <li><a href="#adjacent1">Adjacent 1</a></li>
          <li><a href="#adjacent2">Adjacent 2</a></li>
        </ul>
      </vk-scrollspy-nav>
    </div>

    <div class="uk-container">

      <h1>Scrollspy</h1>

      <h2 id="animation-repeat">Single, Repeat, Delay</h2>

      <vk-grid class="uk-child-width-1-4@m" v-vk-height-match="{ target: '> div > .uk-card' }">
        <div>
          <vk-scrollspy :cls="['uk-animation-fade']">
            <vk-card>
              <p>The element is animated only the first time it appears in the viewport.</p>
            </vk-card>
          </vk-scrollspy>
        </div>
        <div>
          <vk-scrollspy repeat :cls="['uk-animation-slide-right']">
            <vk-card>
              <p>The element is animated every time it appears in the viewport.</p>
            </vk-card>
          </vk-scrollspy>
        </div>
        <div>
          <vk-scrollspy :cls="['uk-animation-slide-right']" :delay="1500" repeat>
            <vk-card>
              <p>The element is animated every time it appears in the viewport but delayed by 1.5s.</p>
            </vk-card>
          </vk-scrollspy>
        </div>
      </vk-grid>

      <h2 id="animation-delay">Group, Repeat, Delay</h2>

      <vk-scrollspy repeat :delay="300" :cls="['uk-animation-fade']" target="> div > .uk-card">
        <vk-grid class="uk-child-width-1-4@m">
          <div>
            <vk-card>
              <p>The animation of this element is delayed by some milliseconds.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <p>The animation of this element is delayed by some milliseconds.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <p>The animation of this element is delayed by some milliseconds.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <p>The animation of this element is delayed by some milliseconds.</p>
            </vk-card>
          </div>
        </vk-grid>
      </vk-scrollspy>

      <h2 id="animation-fade">Group: Fade</h2>

      <vk-scrollspy :cls="['uk-animation-fade']" target="> div > .uk-card" :delay="300" repeat>
        <vk-grid class="uk-child-width-1-4@m uk-margin-xlarge-bottom">
          <div>
            <vk-card>
              <vk-card-title>Fade</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Fade</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Fade</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Fade</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
        </vk-grid>
      </vk-scrollspy>

      <h2 id="animation-scale-up">Group: Scale Up</h2>

      <vk-scrollspy :cls="['uk-animation-scale-up']" target="> div > .uk-card" :delay="300" repeat>
        <vk-grid class="uk-child-width-1-4@m uk-margin-xlarge-bottom">
          <div>
            <vk-card>
              <vk-card-title>Scale Up</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Scale Up</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Scale Up</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Scale Up</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Scale Up</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Scale Up</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Scale Up</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Scale Up</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Scale Up</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Scale Up</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Scale Up</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Scale Up</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Scale Up</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Scale Up</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Scale Up</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Scale Up</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Scale Up</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Scale Up</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Scale Up</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Scale Up</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
        </vk-grid>
      </vk-scrollspy>

      <h2 id="animation-scale-down">Group: Scale Down</h2>

      <vk-scrollspy :cls="['uk-animation-scale-down']" target="> div > .uk-card" :delay="300" repeat>
        <vk-grid class="uk-child-width-1-4@m uk-margin-xlarge-bottom">
          <div>
            <vk-card>
              <vk-card-title>Scale Down</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Scale Down</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Scale Down</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Scale Down</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
        </vk-grid>
      </vk-scrollspy>

      <h2 id="animation-slide-left">Group: Left</h2>

      <vk-scrollspy :cls="['uk-animation-slide-left']" target="> div > .uk-card" :delay="300" repeat>
        <vk-grid class="uk-child-width-1-4@m uk-margin-xlarge-bottom">
          <div>
            <vk-card>
              <vk-card-title>Left</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Left</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Left</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Left</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
        </vk-grid>
      </vk-scrollspy>

      <h2 id="animation-slide-right">Group: Right</h2>

      <vk-scrollspy :cls="['uk-animation-slide-right']" target="> div > .uk-card" :delay="300" repeat>
        <vk-grid class="uk-child-width-1-4@m uk-margin-xlarge-bottom">
          <div>
            <vk-card>
              <vk-card-title>Right</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Right</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Right</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Right</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
        </vk-grid>
      </vk-scrollspy>

      <h2 id="animation-slide-top">Group: Top</h2>

      <vk-scrollspy :cls="['uk-animation-slide-top']" target="> div > .uk-card" :delay="300" repeat>
        <vk-grid class="uk-child-width-1-4@m uk-margin-xlarge-bottom">
          <div>
            <vk-card>
              <vk-card-title>Top</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Top</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Top</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Top</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
        </vk-grid>
      </vk-scrollspy>

      <h2 id="animation-slide-bottom">Group: Bottom</h2>

      <vk-scrollspy :cls="['uk-animation-slide-bottom']" target="> div > .uk-card" :delay="300" repeat>
        <vk-grid class="uk-child-width-1-4@m uk-margin-xlarge-bottom">
          <div>
            <vk-card>
              <vk-card-title>Bottom</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Bottom</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Bottom</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Bottom</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
        </vk-grid>
      </vk-scrollspy>

      <h2 id="animation-different">Different Animations</h2>

      <vk-scrollspy :cls="['uk-animation-slide-bottom']" target="> div > .uk-card" :delay="300" repeat>
        <vk-grid class="uk-child-width-1-4@m uk-margin-xlarge-bottom">
          <div>
            <vk-card>
              <vk-card-title>Bottom</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card vk-scrollspy-class="uk-animation-slide-top">
              <vk-card-title>Top</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card>
              <vk-card-title>Bottom</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
          <div>
            <vk-card vk-scrollspy-class="uk-animation-slide-top">
              <vk-card-title>Top</vk-card-title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </vk-card>
          </div>
        </vk-grid>
      </vk-scrollspy>

      <h2>Adjacent Sibling</h2>

      <div id="adjacent1" class="uk-section uk-section-primary uk-text-center">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      <div id="adjacent2" class="uk-section uk-section-secondary uk-text-center">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>

    </div>

  </div>
</template>

<style scoped>
.test-fixed {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1;
}
</style>
