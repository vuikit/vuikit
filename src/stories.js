import { play } from 'vue-play'

play('Breadcrumb')
  .add('Default', require('./components/breadcrumb/story').default)

play('Button')
  .add('Default', require('./components/button/story').default)
  .add('Groups', require('./components/button/story-groups').default)

play('Drop')
  .add('Default', require('./components/drop/story').default)
  .add('Positions', require('./components/drop/story-positions').default)

play('Dropdown')
  .add('Default', require('./components/dropdown/story').default)
  .add('Positions', require('./components/dropdown/story-positions').default)

play('Icon')
  .add('Icon', require('./components/icon/story/default').default)
  .add('IconButton', require('./components/icon/story/button').default)
  .add('IconLink', require('./components/icon/story/link').default)

play('Modal')
  .add('Default', require('./components/modal/story').default)

play('Notification')
  .add('Default', require('./components/notification/story').default)
  .add('Positions', require('./components/notification/story-positions').default)
  .add('Slot', require('./components/notification/story-slot').default)

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

play('Tabs')
  .add('Default', require('./components/tabs/story').default)

play('Upload')
  .add('Default', require('./components/upload/story').default)

play('Directives')
  .add('Position', require('./directives/position/story').default)
  .add('Tooltip', require('./directives/tooltip/story').default)
  .add('HeightWiewport', require('./directives/height-viewport/story').default)
  .add('HeightWiewport Expand', require('./directives/height-viewport/story-expand').default)
