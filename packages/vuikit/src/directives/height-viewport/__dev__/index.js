import Default from './default.vue'
import { storiesOf } from '@storybook/vue'

storiesOf('Directives', module)
  .add('HeighViewport', () => Default)
  .add('HeighViewport Expand', () => require('./expand.vue').default)
