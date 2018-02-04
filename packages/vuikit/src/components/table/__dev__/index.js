import Default from './default.vue'
import { storiesOf } from '@storybook/vue'

storiesOf('Components/Table', module)
  .add('Default', () => Default)
  .add('Select', () => require('./select.vue').default)
  .add('Sort', () => require('./sort.vue').default)
  .add('Tree', () => require('./tree.vue').default)
