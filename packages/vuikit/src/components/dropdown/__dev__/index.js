import { storiesOf } from '@storybook/vue'

storiesOf('Components/Dropdown', module)
  .add('Default', () => require('./default.vue').default)
  .add('Nav', () => require('./nav.vue').default)
