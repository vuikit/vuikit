import { storiesOf } from '@storybook/vue'

storiesOf('Tabs', module)
  .add('Default', () => require('./default.vue').default)
  .add('Vertical', () => require('./vertical.vue').default)
  .add('Elements', () => require('./elements.vue').default)
