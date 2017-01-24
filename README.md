<p align="center">
  <a href="https://vuikit.github.io/vuikit">
    <img width="150" src="https://cdn.rawgit.com/vuikit/vuikit/master/static/logo-vuikit.svg">
  </a>
</p>

> UIkit with all the power of Vue

Vuikit is a collection of unopinionated, modular Vue.js components outputting UIkit layout.

While it is possible to use UIkit by its own when building Vue components, you may find yourself relying on too many dependencies and building a wrapper to fill the missing logic gap. Vuikit solves all that by removing completely UIkit js and jQuery dependencies and rebuilding the logic with Vue natively while focusing on modularity.

## Documentation and examples

There is a live demo at [http://vuikit.github.io/vuikit](http://vuikit.github.io/vuikit) with technical information about each component. As well as a [codepen](http://codepen.io/miljan/pen/YWXVKj) playground.

## Dependencies

- [Vue](http://vuejs.org/) (^2.1.0)

## Code Samples
> Note that all code examples are using ES6 syntax

Vuikit components are registered globally by default and ready to be used immediately.

```js
import Vue from 'vue'
import Vuikit from 'vuikit'

Vue.use(Vuikit)
```
```html
<template>
  <div>
    <vk-button-checkbox>
      <vk-button color="primary">Button</vk-button>
      <vk-button active>Button</vk-button>
      <vk-button>Button</vk-button>
    </vk-button-checkbox>
  </div>
</template>
```

Although is possible to load and register them individually.

```js
import Vue from 'vue'
import { Button, Modal } from 'vuikit'

// globally
Vue.component('VkButton', Button)
Vue.component('VkModal', Modal)

// or locally
new Vue({
  components: {
    VkButton: Button,
    VkModal: Modal
  }
})
```

Changing the output or adding specific features is straightforward by extending a component.

```js
import Vue from 'vue'
import { Button } from 'vuikit'

Vue.component('TmButton', {
  extends: Button,
  template: '', // the new output
  props: {} // new features
  ...
})
```

## Configuration and Usage

### NPM

```bash
npm install vuikit --save
```
```js
import Vue from 'vue'
import Vuikit from 'vuikit'

Vue.use(Vuikit) // or register individually
```

### Browser

Make sure Vue is loaded upfront and then load `dist/vuikit.js`.

## Developers

``` bash
# install dependencies with Yarn (https://yarnpkg.com/)
# it's much faster and consistent
yarn install

# serve with hot reload at localhost:8080
yarn run dev

# build for distribution
yarn run build
```

## UIkit Themes

You can use UIkit themes out of a box with few exceptions you should be aware of. For those a [custom theme](https://getuikit.com/docs/documentation_create-a-theme.html) is required adding the following workarounds.

### Modal

UIkit Modal transitions are hardcoded plus incompatible with Vue transitions. The solution is to reset those and apply new ones.

```less
.hook-modal() {
  // reset hardcoded transitions
  display: inherit;
  opacity: inherit;
  -webkit-transform: inherit;
  transform: inherit;

  // add custom ones
  -webkit-transition: opacity .3s ease;
  transition: opacity .3s ease;
}

.hook-modal-dialog() {
  // reset hardcoded transitions
  opacity: inherit;
  -webkit-transform: inherit;
  transform: inherit;

  // add custom ones
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
}

// add custom transitions
.hook-modal-misc() {
  .vk-modal-transition-enter .uk-modal-dialog {
    opacity: 0;
  }
  .vk-modal-transition-leave-active .uk-modal-dialog {
    opacity: 0;
  }
  .vk-modal-transition-enter .uk-modal-dialog,
  .vk-modal-transition-leave-active .uk-modal-dialog {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}
```

### Dropdown

Similar as with Modal, Dropdown transition styles must be reseted.

```less
// reset hardcoded transitions
.hook-dropdown-misc() {
  .uk-dropdown,
  .uk-dropdown-blank {
    display: inherit;
  }
}
```

### Offcanvas

```less
@offcanvas-transition-speed: .3s;
@offcanvas-transition-timing: ease;

.hook-offcanvas() {
  // null hardcoded transitions
  display: inherit;
  // necessary for Vue transition hooks
  transition-duration: @offcanvas-transition-speed;
}

.hook-offcanvas-bar() {
  // apply new transitions
  -webkit-transform: translateX(-100%);
  -ms-transform: translateX(-100%);
  transform: translateX(-100%);
  transition: transform @offcanvas-transition-speed @offcanvas-transition-timing;
}

.hook-offcanvas-misc() {
  .uk-offcanvas-page {
    transition: margin-left @offcanvas-transition-speed @offcanvas-transition-timing;
  }
  .uk-offcanvas-page-open .uk-offcanvas-bar,
  .uk-offcanvas-page-open .uk-offcanvas-bar {
    -webkit-transform: translateX(0%);
    -ms-transform: translateX(0%); // IE9
    transform: translateX(0%);
  }
}
```

### Table

The VkTable component relies on Vuikit [specific](https://github.com/vuikit/vuikit-theme/blob/master/lib/vuikit/table.less) styling.

## Semver

Until Vuikit reaches a 1.0 release, breaking changes will be released with a new minor version. For example 0.4.0 and 0.4.1 have the same API, but 0.5.0 have breaking changes.

## License

Vuikit is open source and released under the [MIT License](LICENSE).

Copyright (c) 2016 ZOOlanders.com
