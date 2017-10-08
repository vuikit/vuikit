import { play } from 'vue-play'

play('Breadcrumb')
  .add('Default', require('./breadcrumb/story').default)

play('Button')
  .add('Button', require('./button/story/default').default)
  .add('Checkbox', require('./button/story/checkbox').default)
  .add('Radio', require('./button/story/radio').default)

play('Drop')
  .add('Default', require('./drop/story/default').default)
  .add('Boundary', require('./drop/story/boundary').default)
  .add('Position', require('./drop/story/position').default)

play('Dropdown')
  .add('Default', require('./dropdown/story/default').default)
  .add('Animations', require('./dropdown/story/animations').default)
  .add('Position', require('./dropdown/story/position').default)

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
