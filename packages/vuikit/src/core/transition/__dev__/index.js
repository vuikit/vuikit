import { storiesOf } from '@storybook/vue'

storiesOf('Core/Transition', module)
  .add('Default', () => require('./default').default)
