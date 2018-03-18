import { storiesOf } from '@storybook/vue'

storiesOf('Directives/HeighViewport', module)
  .add('Default', () => require('./default').default)
  .add('Expand', () => require('./expand').default)
