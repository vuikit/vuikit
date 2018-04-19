# vuikit

[![NPM version](https://img.shields.io/npm/v/vuikit.svg?style=flat-square)](https://npmjs.org/package/vuikit)

## Install

```
$ npm install --save vuikit
```

## Usage

```js
import Vue from 'vue'
import Vuikit from 'vuikit'

Vue.use(Vuikit)
```

```vue
<template>
  <vk-button>MyButton</vk-button>
</template>
```

### Smaller Bundle Size

Installing the entire library is useful for prototyping and testing but for production is recommended to cherry pick the desired resources and register them manually.

```js
import { Button as VkButton } from 'vuikit/lib/button'
import { Tooltip as VkTooltip } from 'vuikit/lib/tooltip'

// globally
Vue.component('VkButton', VkButton)
Vue.directive('VkTooltip', VkTooltip) // tooltip is a directive

// or locally
export default {
  components: {
    VkButton
  },
  directives: {
    VkTooltip
  }
}
```

## License

[MIT](./LICENSE) © [Miljan Aleksic](https://github.com/miljan-aleksic)
