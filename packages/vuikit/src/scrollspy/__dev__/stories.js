import { storiesOf } from '@storybook/vue'

storiesOf('Scrollspy', module)
  .add('Default', () => require('./default.vue').default)
  .add('Nav', () => require('./nav.vue').default)
