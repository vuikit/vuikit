import { storiesOf } from '@storybook/vue'

storiesOf('Components/Navbar', module)
  .add('Default', () => require('./default').default)
  .add('Dropdown', () => require('./dropdown').default)
  .add('Dropbar', () => require('./dropbar').default)
