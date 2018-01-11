# Vuikit Icons

> UIkit icons as Vue functional components

Check [UIkit](https://getuikit.com/docs/icon) documentation for the icons preview and its possible output. The functional components will render the raw SVG, to apply the styles wrap them with one of the Vuikit icon components as described in the example below. You can of course do so manually or even use your own styles.

## Usage

Register the icons globally

```js
import Vue from 'vue'
import VuikitIcons from '@vuikit/icons'

Vue.use(VuikitIcons)
```

Or locally

```js
import { IconPlus } from '@vuikit/icons'

export default {
  components: {
    IconPlus
  }
}
```

And use in your templates

```vue
<template>
  // use raw to render the svg as it
  <icon-plus></icon-plus>

  // customize the ratio for size variations
  // or use the other props for a more precise rendering
  <icon-plus
    ratio="1.5"
    width="50"
    height="50"
    viewBox="0 0 10 10"
  ></icon-plus>

  // if using Vuikit 0.7.0 you can and should render
  // the icon with one of the icon components
  <vk-icon name="plus"></vk-icon>
  <vk-icon-link name="plus"></vk-icon-link>
  <vk-icon-button name="plus"></vk-icon-button>

  // custom icons or registered with a diferent name will
  // not be recognized, but you can wrap them instead
  <vk-icon name="plus">
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

Note: the icons itself could be subjected to a different license. Please refer to [UIkit](https://github.com/uikit/uikit) for more information about it.
