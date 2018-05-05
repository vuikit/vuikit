import { storiesOf } from '@storybook/vue'

storiesOf('Navbar', module)
  .add('Default', () => require('./default.vue').default)
  .add('Dropdown', () => require('./dropdown.vue').default)
  .add('Dropbar', () => require('./dropbar.vue').default)
