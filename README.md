[![Vuikit](https://user-images.githubusercontent.com/513275/37552738-b8fcea74-29f5-11e8-9300-5e9532271bf8.png)](http://vuikit.js.org/)

# Vuikit

A responsive [Vue](https://vuejs.org/) UI library for web site interfaces based on the [UIkit](https://getuikit.com/) framework.

## Usage

To start right away register the assets globally.

```js
import Vue from 'vue'
import Vuikit from 'vuikit'
import VuikitIcons from '@vuikit/icons'

Vue.use(Vuikit)
Vue.use(VuikitIcons)

<template>
  <vk-button>MyButton</vk-button>
  <vk-icon name="check"></vk-icon>
</template>
```

In order to reduce the final bundle size cherry pick the desired assets and register them globally or locally.

```js
// components
import { Button as VkButton } from 'vuikit/lib/button'
// directives
import { Tooltip as VkTooltip } from 'vuikit/lib/tooltip'
// icons
import VkIconsCheck from '@vuikit/icon/lib'

// register globally
Vue.component('VkButton', VkButton)
Vue.directive('VkTooltip', VkTooltip)
Vue.component('VkIconsCheck', VkIconsCheck)

// or locally
export default {
  components: {
    VkButton,
    VkIconsCheck
  },
  directives: {
    VkTooltip
  }
}
```

## Sponsors

[![ZOOlanders](https://user-images.githubusercontent.com/513275/37552836-79db359c-29f7-11e8-9c24-d46f4625b9f1.png)](http://zoolanders.com/)

Special thanks to ZOOlanders for supporting the project from the very beginning.

## Semver

Until a v1.0.0 is reached, breaking changes will be released with a new minor version. For example 0.4.0 and 0.4.1 would have the same API and it's safe to update, but 0.5.0 would have breaking changes and the integration may require a review.

## Author

**Vuikit** © [Miljan Aleksic](https://github.com/miljan-aleksic). Released under the [MIT](./LICENSE) License.<br>

Substantial part of the code was adapted from [UIkit](https://github.com/uikit/uikit) © 2013-2018 YOOtheme GmbH, getuikit.com
