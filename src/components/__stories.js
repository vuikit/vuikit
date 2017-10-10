import { play } from 'vue-play'

play('Breadcrumb')
  .add('Default', require('./breadcrumb/story').default)

play('Button')
  .add('Button', require('./button/story').default)
  .add('UI', require('./button/ui/story').default)

play('Drop')
  .add('Default', require('./drop/story').default)
  .add('Target', require('./drop/story-target').default)
  .add('UI - Positions', require('./drop/ui/story-positions').default)
  .add('UI - Alignment', require('./drop/ui/story-alignment').default)
  .add('UI - Boundary', require('./drop/ui/story-boundary').default)

play('Dropdown')
  .add('Default', require('./dropdown/story').default)

play('Icon')
  .add('Icon', require('./icon/story/default').default)
  .add('IconButton', require('./icon/story/button').default)
  .add('IconLink', require('./icon/story/link').default)

play('Modal')
  .add('Default', require('./modal/story').default)

play('Notification')
  .add('Default', require('./notification/story').default)

play('Pagination')
  .add('Default', require('./pagination/story').default)

play('Spinner')
  .add('Default', require('./spinner/story').default)

play('Sticky')
  .add('Default', require('./sticky/story').default)

play('Subnav')
  .add('Default', require('./subnav/story').default)

play('Table')
  .add('Default', require('./table/story/default').default)
  .add('Select', require('./table/story/select').default)
  .add('Sort', require('./table/story/sort').default)

play('Tabs')
  .add('Default', require('./tabs/story').default)

play('Tooltip')
  .add('Default', require('./tooltip/story').default)

play('Upload')
  .add('Default', require('./upload/story').default)

play('HeightViewport Directive')
  .add('Default', require('../directives/height-viewport/story/default').default)
  .add('Expand', require('../directives/height-viewport/story/expand').default)
