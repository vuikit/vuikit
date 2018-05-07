import { storiesOf } from '@storybook/vue'

storiesOf('Modal', module)
  .add('Default', () => require('./default.vue').default)
  .add('Full', () => require('./full.vue').default)
