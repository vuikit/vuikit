[![Vuikit](https://user-images.githubusercontent.com/513275/37552738-b8fcea74-29f5-11e8-9300-5e9532271bf8.png)](http://vuikit.js.org/)

# Vuikit

A responsive [Vue](https://vuejs.org/) UI library for web site interfaces based on [UIkit](https://getuikit.com/) framework.

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

## Sponsors

[![ZOOlanders](https://user-images.githubusercontent.com/513275/37552836-79db359c-29f7-11e8-9c24-d46f4625b9f1.png)](http://zoolanders.com/)

Special thanks to ZOOlanders for supporting the project from the very beginning.

## License

[MIT](./LICENSE) © [Miljan Aleksic](https://github.com/miljan-aleksic)

## Acknowledgments

Substantial part of the code is adapted from [UIkit](https://github.com/uikit/uikit) © 2013-2018 YOOtheme GmbH, getuikit.com.
