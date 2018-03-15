import { run, remove, copy, zip } from '@miljan/build'

const info = require('../packages/vuikit/package.json')
const file = `dist/vuikit-${info.version}.zip`

run(async () => {
  await remove('dist/tmp')

  await Promise.all([
    // vuikit
    copy('packages/vuikit/dist/vuikit.js', 'dist/tmp'),
    copy('packages/vuikit/dist/vuikit.min.js', 'dist/tmp'),
    copy('packages/vuikit/dist/vuikit.min.js.map', 'dist/tmp'),
    copy('packages/vuikit/dist/vuikit.css', 'dist/tmp'),
    copy('packages/vuikit/dist/vuikit.min.css', 'dist/tmp'),
    copy('packages/vuikit/dist/vuikit.min.css.map', 'dist/tmp'),

    // vuikit-icons
    copy('packages/vuikit-icons/dist/vuikit-icons.js', 'dist/tmp'),
    copy('packages/vuikit-icons/dist/vuikit-icons.min.js', 'dist/tmp'),
    copy('packages/vuikit-icons/dist/vuikit-icons.min.js.map', 'dist/tmp')
  ])

  await zip('dist/tmp', file)
  await remove('dist/tmp')
})
