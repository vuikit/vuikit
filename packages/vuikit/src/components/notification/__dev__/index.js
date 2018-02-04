import Default from './default.vue'
import { storiesOf } from '@storybook/vue'

storiesOf('Components/Notification', module)
  .add('Default', () => Default)
  .add('Positions', () => require('./positions.vue').default)
  .add('Slot', () => require('./slot.vue').default)
