import { storiesOf } from '@storybook/vue'

storiesOf('Components/Scrollspy', module)
  .add('Default', () => require('./default').default)
  .add('Nav', () => require('./nav').default)
