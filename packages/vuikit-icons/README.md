# vuikit-icons

[![NPM version](https://img.shields.io/npm/v/@vuikit/icons.svg?style=flat-square)](https://npmjs.org/package/@vuikit/icons)

## Install

```
$ npm install --save @vuikit/icons
```

## Usage

```js
import Vue from 'vue'
import VuikitIcons from '@vuikit/icons'

Vue.use(VuikitIcons)
```

```vue
<template>
  <div>
    <vk-icons-heart></vk-icons-heart>
    <vk-icons-check></vk-icons-check>
  </div>
</template>
```

### Integration with Vuikit

To apply the Vuikit styles the icons must be used with one of the `vk-icon` components. Those will automatically recognize the icons registered with a `vk-icons` prefix and allow them to be used by their name.

```
import Vue from 'vue'
import Vuikit from 'vuikit'
import VuikitIcons from '@vuikit/icons'

Vue.use(Vuikit)
Vue.use(VuikitIcons)
```

```vue
<template>
  <div>
    <vk-icon icon="heart"></vk-icon>
    <vk-icon-link icon="check"></vk-icon-link>
    <vk-icon-button icon="twitter"></vk-icon-button>
  </div>
</template>
```

### Smaller Bundle Size

Installing the entire library is useful for prototyping and testing but for production is recommended to cherry pick the desired icons and register them manually.

```js
import VkIconsHeart from '@vuikit/icons/lib/heart'

// globally
Vue.component('VkIconsHeart', VkIconsHeart)

// or locally
export default {
  components: {
    VkIconsHeart
  }
}
```

### Custom Icons

Vuikit icons are in essence UIkit icons converted to Vue functional components, and you can convert your custom icons as well. Fork this repo locally and the svg files in the `custom` directory, then use the console to execute the conversion.

```bash
npm install
npm run custom
```

## License

[MIT](./LICENSE) © [Miljan Aleksic](https://github.com/miljan-aleksic)

## Acknowledgments

The icons source code is copyrighted by [UIkit](https://github.com/uikit/uikit) © 2013-2018 YOOtheme GmbH, getuikit.com.
