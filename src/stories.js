import { play } from 'vue-play'

play('Breadcrumb')
  .add('Default', require('./components/breadcrumb/story').default)

play('Button')
  .add('Default', require('./components/button/story/default').default)
  .add('Groups', require('./components/button/story/groups').default)

play('Card')
  .add('Default', require('./components/card/story').default)

play('Drop')
  .add('Default', require('./components/drop/story/default').default)
  .add('Positions', require('./components/drop/story/positions').default)

play('Dropdown')
  .add('Default', require('./components/dropdown/story/default').default)
  .add('Nav', require('./components/dropdown/story/nav').default)

play('Icon')
  .add('Default', require('./components/icon/story').default)

play('Iconnav')
  .add('Default', require('./components/iconnav/story').default)

play('Modal')
  .add('Default', require('./components/modal/story/default').default)
  .add('Scrollbar', require('./components/modal/story/scrollbar').default)
  .add('Sizes', require('./components/modal/story/sizes').default)
  .add('Center', require('./components/modal/story/center').default)

play('Nav')
  .add('Default', require('./components/nav/story').default)

play('Navbar')
  .add('Default', require('./components/navbar/story').default)

play('Notification')
  .add('Default', require('./components/notification/story/default').default)
  .add('Positions', require('./components/notification/story/positions').default)
  .add('Slot', require('./components/notification/story/slot').default)

play('Pagination')
  .add('Default', require('./components/pagination/story').default)

play('Spinner')
  .add('Default', require('./components/spinner/story').default)

play('Sticky')
  .add('Default', require('./components/sticky/story').default)

play('Subnav')
  .add('Default', require('./components/subnav/story').default)

play('Table')
  .add('Default', require('./components/table/story/default').default)
  .add('Select', require('./components/table/story/select').default)
  .add('Sort', require('./components/table/story/sort').default)

play('Tab')
  .add('Default', require('./components/tab/story/default').default)
  .add('Vertical', require('./components/tab/story/vertical').default)

play('Upload')
  .add('Default', require('./components/upload/story').default)

play('Directives')
  .add('Position', require('./directives/position/story').default)
  .add('Tooltip', require('./directives/tooltip/story').default)
  .add('HeightWiewport', require('./directives/height-viewport/story').default)
  .add('HeightWiewport Expand', require('./directives/height-viewport/story-expand').default)
