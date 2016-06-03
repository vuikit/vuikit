# Vuikit

> UIkit with all the power of Vue

Vuikit is a collection of native Vue components that embrace and extend the UIkit framework. While it is possible to use UIkit by its own when building Vue components, you may find your self building a wrapper around it to fill the missing logic gap or to make it behave more naturally with Vue. Vuikit solves all that by providing a precise, well documented API.

## Dependencies

- [Vue](http://vuejs.org/) (^1.0.24)
- [UIkit](http://getuikit.com/) (^2.26.0)
- [Moment](http://momentjs.com/) (^2.13.0 only if using VkCalendar or VkDatepicker)
- [jQuery](https://jquery.com//) (Inherited UIkit dependency)

## Code Samples

All Vuikit components are registered globally and ready to use immediately.

```js
import Vue from 'vue'
import Vuikit from 'vuikit'

Vue.use(vuikit)
```

```html
<template>
  <div>
    <vk-button-checkbox>
      <vk-button style="primary">Buttonvk-button>
      <vk-button active>Button</vk-button>
      <vk-button>Button</vk-button>
    </vk-button-checkbox>
  </div>
</template>
```

Although, there is no need to load them all, is recommended to register individually only the required ones.

```js
import Vue from 'vue'
import Button from 'vuikit/src/Button'
import Alert from 'vuikit/src/Alert'

// globally
Vue.component('VkButton', Button)
Vue.component('VkAlert', Alert)

// or locally
new Vue({
  components: {
    VkButton: Button,
    VkAlert: Alert,
  }
})
```

Extending the component allows changing the output or adding specific features.

```js
import Vue from 'vue'
import Button from 'vuikit/src/Button'

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

Make sure UIkit and Vue latest version assets are loaded upfront and then load `dist/vuikit.css` and `dist/vuikit.js`.

## Documentation and Demo

See the [documentation](http://joolanders.github.io/vuikit/) with live editable examples.

## Developers

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for distribution
npm run dist

# build docs
npm run docs
```

## License
Vuikit is open source and released under the [MIT License](LICENSE.md).

Copyright (c) 2016 ZOOlanders.com
