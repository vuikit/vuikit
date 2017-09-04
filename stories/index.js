import { storiesOf } from '@storybook/vue'
import '../dist/vuikit.css'

storiesOf('Basic/Button', module)
  .add('Button', () => require('./basic/button'))
  .add('Checkbox Group', () => require('./basic/button-group-checkbox'))
  .add('Radio Group', () => require('./basic/button-group-radio'))

storiesOf('Basic/Icon', module)
  .add('Default', () => require('./basic/icon'))

storiesOf('Basic/Spinner', module)
  .add('Default', () => require('./basic/spinner'))

storiesOf('Data', module)
  .add('Table', () => require('./data/table/index'))

storiesOf('Navigation/Breadcrumb', module)
  .add('Default', () => require('./navigation/breadcrumb'))

storiesOf('Navigation/Pagination', module)
  .add('Default', () => require('./navigation/pagination'))

storiesOf('Navigation/Subnav', module)
  .add('Default', () => require('./navigation/subnav'))

storiesOf('Navigation/Tabs', module)
  .add('Default', () => require('./navigation/tabs'))

storiesOf('Navigation/Dropdown', module)
  .add('Default', () => require('./navigation/dropdown/default'))
  .add('Animations', () => require('./navigation/dropdown/animations'))
  .add('Positions', () => require('./navigation/dropdown/positions'))

storiesOf('Others/Drop', module)
  .add('Default', () => require('./others/drop/default'))
  .add('Boundary', () => require('./others/drop/boundary'))
  .add('Position', () => require('./others/drop/position'))

storiesOf('Others', module)
  .add('Datepicker', () => require('./others/datepicker'))
  .add('Modal', () => require('./others/modal'))
  .add('Offcanvas', () => require('./others/offcanvas'))
  .add('Sticky', () => require('./others/sticky'))
  .add('Tooltip', () => require('./others/tooltip'))
  .add('Upload', () => require('./others/upload'))

storiesOf('Directives/HeightViewport', module)
  .add('Default', () => require('./directives/height-viewport/default'))
  .add('Expand', () => require('./directives/height-viewport/expand'))
