<p align="center">
  <a href="https://vuikit.github.io/vuikit">
    <img width="150" src="https://cdn.rawgit.com/vuikit/vuikit/master/static/logo-vuikit.svg">
  </a>
</p>

Vuikit is a [MIT](https://github.com/vuikit/vuikit/blob/develop/LICENSE) licensed [Vue](https://vuejs.org/) UI library based on [UIkit](https://getuikit.com/). In other words, Vuikit fulfills the necessity of a consistent and responsive framework for web site interfaces.

<p align="center">
  <a href="http://vuikit.js.org">Documentation</a> -
  <a href="https://twitter.com/vuikit">Twitter</a>
</p>

---

```js
// register the components globally
import Vue from 'vue'
import Vuikit from 'vuikit'

Vue.use(Vuikit)

// and use in your templates
<template>
  <vk-button>MyButton</vk-button>
</template>
```

```js
// if only a few components are required the final bundle size can be
// drastically reduced by importing only the individual components
import { Button as VkButton } from 'vuikit/lib/button'
import { Label as VkLabel } from 'vuikit/lib/label'

export default {
  components: {
    VkButton,
    VkLabel
  }
}
```

## Semver

Until Vuikit reaches a 1.0 release, breaking changes will be released with a new minor version. For example 0.4.0 and 0.4.1 would have the same API and it's safe to update, but 0.5.0 would have breaking changes and the implementation may require a review.

## License

Vuikit is open source and released under the [MIT License](LICENSE).

[MIT](LICENSE) &copy; [Miljan Aleksic](https://twitter.com/AleksicMiljan)

Substantial part of the code is adapted from UIkit - to Copyright (c) 2013-2018 YOOtheme GmbH, getuikit.com
