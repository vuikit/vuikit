import { storiesOf } from '@storybook/vue'

storiesOf('Components/Table', module)
  .add('Default', () => require('./default').default)
  .add('Select', () => require('./select').default)
  .add('Sort', () => require('./sort').default)
  .add('Tree', () => require('./tree').default)
