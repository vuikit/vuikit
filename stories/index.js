import { storiesOf } from '@storybook/vue'
import '../dist/vuikit.css'

storiesOf('Basic', module)
  .add('Button', () => require('./basic/button.vue'))
  .add('Button Checkbox', () => require('./basic/button-checkbox.vue'))
  .add('Button Radio', () => require('./basic/button-radio.vue'))
  .add('Icon', () => require('./basic/icon.vue'))
  .add('Spinner', () => require('./basic/spinner.vue'))

storiesOf('Data', module)
  .add('Table', () => require('./data/table/index.vue'))

storiesOf('Navigation/Breadcrumb', module)
  .add('Default', () => require('./navigation/breadcrumb.vue'))

storiesOf('Navigation/Pagination', module)
  .add('Default', () => require('./navigation/pagination.vue'))

storiesOf('Navigation/Subnav', module)
  .add('Default', () => require('./navigation/subnav.vue'))

storiesOf('Navigation/Tabs', module)
  .add('Default', () => require('./navigation/tabs.vue'))

storiesOf('Navigation/Dropdown', module)
  .add('Default', () => require('./navigation/dropdown/default.vue'))
  .add('Animations', () => require('./navigation/dropdown/animations.vue'))
  .add('Positions', () => require('./navigation/dropdown/positions.vue'))

storiesOf('Others/Drop', module)
  .add('Default', () => require('./others/drop/default.vue'))
  .add('Boundary', () => require('./others/drop/boundary.vue'))
  .add('Position', () => require('./others/drop/position.vue'))

storiesOf('Others', module)
  .add('Datepicker', () => require('./others/datepicker.vue'))
  .add('Modal', () => require('./others/modal.vue'))
  .add('Offcanvas', () => require('./others/offcanvas.vue'))
  .add('Sticky', () => require('./others/sticky.vue'))
  .add('Tooltip', () => require('./others/tooltip.vue'))
  .add('Upload', () => require('./others/upload.vue'))
