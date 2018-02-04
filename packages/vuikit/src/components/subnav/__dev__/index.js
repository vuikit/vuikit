import Default from './default.vue'
import { storiesOf } from '@storybook/vue'

storiesOf('Components/Subnav', module)
  .add('Default', () => Default)
  .add('UI', () => require('./ui.vue').default)
