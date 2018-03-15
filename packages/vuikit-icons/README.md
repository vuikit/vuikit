<p align="center">
  <a href="https://vuikit.github.io/vuikit">
    <img width="150" src="https://cdn.rawgit.com/vuikit/vuikit/master/static/logo-vuikit.svg">
  </a>
</p>

> UIkit with all the power of Vue

Check [UIkit](https://getuikit.com/docs/icon) documentation for the icons preview and its possible output. The functional components will render the raw SVG, to apply the styles wrap them with one of the Vuikit icon components as described in the example below. You can of course do so manually or even use your own styles.

<p align="center">
  <a href="http://vuikit.js.org">Documentation</a> -
  <a href="https://twitter.com/vuikit">Twitter</a>
</p>

---

```js
// register the icons globally
import Vue from 'vue'
import VuikitIcons from '@vuikit/icons'

Vue.use(VuikitIcons)

// and use in your templates
<template>
  <icon-twitter></icon-twitter>
</template>
```

```js
// if only a few icons are required the final bundle size can be
// drastically reduced by importing them individually
import IconGithub from '@vuikit/icons/github'
import IconTwitter from '@vuikit/icons/twitter'

export default {
  components: {
    IconGithub,
    IconTwitter
  }
}
```

```html
<template>
  // the ratio and other properties can be customized through props
  <icon-twitter
    ratio="1.5"
    width="50"
    height="50"
    viewBox="0 0 10 10"
  ></icon-twitter>

  // if using Vuikit 0.7.0 use one of the Icon components
  <vk-icon name="twitter"></vk-icon>
  <vk-icon-link name="twitter"></vk-icon-link>
  <vk-icon-button name="twitter"></vk-icon-button>

  // custom icons or registered with a different prefix will
  // not be recognized, but you can wrap them instead
  <vk-icon>
    <my-icon></my-icon>
  </vk-icon>
</template>
```

## Custom Icons

The custom directory allows you to convert your own SVG icons in ready to use
functional components.

```bash
# make sure you have installed the dependencies by running
yarn install

# then place the svg files in the custom folder
yarn run icons
```

## License

[MIT](LICENSE) &copy; [Miljan Aleksic](https://twitter.com/AleksicMiljan)

The icons source code are subjected to Copyright (c) 2013-2018 YOOtheme GmbH, getuikit.com
