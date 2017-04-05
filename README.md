<p align="center">
  <a href="https://vuikit.github.io/vuikit">
    <img width="150" src="https://cdn.rawgit.com/vuikit/vuikit/master/static/logo-vuikit.svg">
  </a>
</p>

> UIkit with all the power of Vue

Vuikit is a collection of unopinionated, modular Vue.js components outputting UIkit layout.

While it is possible to use UIkit by its own when building Vue components, you may find yourself relying on too many dependencies and building a wrapper to fill the missing logic gap. Vuikit solves all that by removing UIkit js and jQuery dependencies and rebuilding the logic with Vue natively.

## Supporting Vuikit

Special thanks to the supporters who help pushing this project forward.

<p align="center">
  <br />
  <a href="http://www.zoolanders.com"><img width="150px" src="https://raw.githubusercontent.com/vuikit/vuikit/develop/static/sponsors/zoolanders.png"></a>
</p>

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

## Semver

Until Vuikit reaches a 1.0 release, breaking changes will be released with a new minor version. For example 0.4.0 and 0.4.1 have the same API, but 0.5.0 have breaking changes.

## License

Vuikit is open source and released under the [MIT License](LICENSE).

Copyright (c) 2016-present, [Miljan Aleksic](https://twitter.com/AleksicMiljan)
