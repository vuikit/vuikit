import Default from './default.vue'
import { storiesOf } from '@storybook/vue'

storiesOf('Components/Modal', module)
  .add('Default', () => Default)
  .add('Center', () => require('./center.vue').default)
  .add('Scrollbar', () => require('./scrollbar.vue').default)
  .add('Sizes', () => require('./sizes.vue').default)
