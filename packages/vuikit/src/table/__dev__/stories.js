import { storiesOf } from '@storybook/vue'

storiesOf('Table', module)
  .add('Default', () => require('./table.vue').default)
  .add('Alignment', () => require('./table-alignment.vue').default)
  .add('Dimensions', () => require('./table-dimensions.vue').default)
  .add('Modifiers', () => require('./table-modifiers.vue').default)
  .add('Slots', () => require('./table-slots.vue').default)

storiesOf('Table/Tree', module)
  .add('Default', () => require('./tree.vue').default)

storiesOf('Table/Columns', module)
  .add('Sort', () => require('./column-sort.vue').default)
  .add('Select', () => require('./column-select.vue').default)

storiesOf('Table/Filter', module)
  .add('Default', () => require('./filter.vue').default)

storiesOf('Table/Pagination', module)
  .add('Default', () => require('./pagination.vue').default)
