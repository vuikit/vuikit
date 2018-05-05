import { storiesOf } from '@storybook/vue'

storiesOf('HeighViewport', module)
  .add('Default', () => require('./default.vue').default)
  .add('Expand', () => require('./expand.vue').default)
