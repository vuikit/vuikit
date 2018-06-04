import { storiesOf } from '@storybook/vue'

storiesOf('Table', module)
  .add('Default', () => require('./default.vue').default)
  .add('Slots', () => require('./slots.vue').default)
  .add('Misc', () => require('./misc.vue').default)
