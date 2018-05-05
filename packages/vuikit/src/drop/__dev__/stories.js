import { storiesOf } from '@storybook/vue'

storiesOf('Drop', module)
  .add('Default', () => require('./default.vue').default)
  .add('Boundary', () => require('./boundary.vue').default)
  .add('Position', () => require('./position.vue').default)
