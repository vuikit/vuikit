[![Vuikit](https://user-images.githubusercontent.com/513275/37552738-b8fcea74-29f5-11e8-9300-5e9532271bf8.png)](http://vuikit.js.org/)

# Vuikit

A responsive [Vue](https://vuejs.org/) 2 UI library for web site interfaces based on the [UIkit](https://getuikit.com/) 3 framework.

> If you are enjoying Vuikit and want to support the project consider making a small [donation](https://www.paypal.me/MiljanAleksic). It means a lot :)

# Getting Started

```vue
<script>
import Vue from 'vue'
import Vuikit from 'vuikit'
import VuikitIcons from '@vuikit/icons'

Vue.use(Vuikit)
Vue.use(VuikitIcons)
</script>

<template>
  <vk-button>MyButton</vk-button>
  <vk-icon icon="heart"></vk-icon>
</template>
```

## Packages

`vuikit` repository is a [monorepo](https://danluu.com/monorepo/) managed by [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/). Click on package name to see specific docs.

| Package | Version | Description |
|---|---|---|
| [`vuikit`](packages/vuikit) | [![NPM version](https://img.shields.io/npm/v/vuikit.svg?style=flat-square)](https://npmjs.org/package/vuikit) | The main package |
| [`vuikit-icons`](packages/vuikit-icons) | [![NPM version](https://img.shields.io/npm/v/@vuikit/icons.svg?style=flat-square)](https://npmjs.org/package/@vuikit/icons) | Icons collection |
| [`vuikit-theme`](packages/vuikit-theme) | [![NPM version](https://img.shields.io/npm/v/@vuikit/theme.svg?style=flat-square)](https://npmjs.org/package/@vuikit/theme) | Default theme |

## Semver

Until a v1.0.0 is reached, breaking changes will be released with a new minor version. For example 0.4.0 and 0.4.1 would have the same API and it's safe to update, but 0.5.0 would have breaking changes and the integration may require a review.

## Acknowledgments

A special thanks to:

 - [ZOOlanders](https://zoolanders.com/) for sponsoring Vuikit.
 - [YOOtheme](https://yootheme.com/) for creating and open sourcing UIkit.

## License

[MIT](./LICENSE) © [Miljan Aleksic](https://github.com/miljan-aleksic)
