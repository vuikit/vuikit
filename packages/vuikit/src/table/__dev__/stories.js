import { storiesOf } from '@storybook/vue'

storiesOf('Table', module)
  .add('Default', () => require('./default.vue').default)
  .add('Slots', () => require('./slots.vue').default)
  .add('Modifiers', () => require('./modifiers.vue').default)
  .add('Select', () => require('./select.vue').default)
  .add('Sort', () => require('./sort.vue').default)
  .add('Tree', () => require('./tree.vue').default)
