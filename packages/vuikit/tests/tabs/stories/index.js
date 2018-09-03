import { storiesOf } from '@storybook/vue'

storiesOf('Components/Tabs', module)
  .add('Default', () => require('./default').default)
  .add('Vertical', () => require('./vertical').default)
  .add('Elements', () => require('./elements').default)
