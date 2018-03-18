import { storiesOf } from '@storybook/vue'

storiesOf('Components/Drop', module)
  .add('Default', () => require('./default').default)
  .add('Boundary', () => require('./boundary').default)
  .add('Position', () => require('./position').default)
