import Default from './default.vue'
import { storiesOf } from '@storybook/vue'

storiesOf('Components/Tab', module)
  .add('Default', () => Default)
  .add('Vertical', () => require('./vertical.vue').default)
