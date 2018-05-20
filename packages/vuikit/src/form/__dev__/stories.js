import { storiesOf } from '@storybook/vue'

storiesOf('Form/Input', module)
  .add('Default', () => require('./input/default.vue').default)
  .add('Elements', () => require('./input/elements.vue').default)

storiesOf('Form/Textarea', module)
  .add('Default', () => require('./textarea/default.vue').default)
  .add('Elements', () => require('./textarea/elements.vue').default)

storiesOf('Form/Select', module)
  .add('Default', () => require('./select/default.vue').default)
  .add('Elements', () => require('./select/elements.vue').default)

storiesOf('Form/Radio', module)
  .add('Default', () => require('./radio/default.vue').default)
  .add('Elements', () => require('./radio/elements.vue').default)

storiesOf('Form/Checkbox', module)
  .add('Default', () => require('./checkbox/default.vue').default)
  .add('Elements', () => require('./checkbox/elements.vue').default)

storiesOf('Form/Range', module)
  .add('Default', () => require('./range/default.vue').default)
  .add('Elements', () => require('./range/elements.vue').default)

storiesOf('Form/Layout', module)
  .add('Default', () => require('./layout/default.vue').default)
  .add('Elements', () => require('./layout/elements.vue').default)
