import { remove, task, exec, run, copy, zip } from '@miljan/build'

run(async () => {
  await remove('dist')

  // build
  await task('Build Vuikit', () => exec('yarn build', { cwd: 'packages/vuikit' }))
  await task('Build Icons', () => exec('yarn build', { cwd: 'packages/vuikit-icons' }))
  await task('Build Theme', () => exec('yarn build', { cwd: 'packages/vuikit-theme' }))

  // package
  await Promise.all([
    // vuikit
    copy('packages/vuikit/dist/vuikit.js', 'dist/pkg'),
    copy('packages/vuikit/dist/vuikit.min.js', 'dist/pkg'),
    copy('packages/vuikit/dist/vuikit.min.js.map', 'dist/pkg'),

    // vuikit-theme
    copy('packages/vuikit-theme/dist/vuikit.css', 'dist/pkg'),
    copy('packages/vuikit-theme/dist/vuikit.min.css', 'dist/pkg'),
    copy('packages/vuikit-theme/dist/vuikit.min.css.map', 'dist/pkg'),

    // vuikit-icons
    copy('packages/vuikit-icons/dist/vuikit-icons.js', 'dist/pkg'),
    copy('packages/vuikit-icons/dist/vuikit-icons.min.js', 'dist/pkg'),
    copy('packages/vuikit-icons/dist/vuikit-icons.min.js.map', 'dist/pkg')
  ])

  await zip('dist/pkg', `dist/vuikit.zip`)
  await remove('dist/pkg')
})
