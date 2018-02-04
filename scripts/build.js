import { remove, task, exec, run, copyRecursive } from '@miljan/build'

run(async () => {
  await remove('dist')

  await task('Build Vuikit', async spinner => {
    await exec('yarn build', { cwd: 'packages/vuikit' })
  })

  await task('Build VuikitIcons', async spinner => {
    await exec('yarn build', { cwd: 'packages/vuikit-icons' })
  })

  await Promise.all([
    copyRecursive('packages/vuikit/dist', 'dist/vuikit'),
    copyRecursive('packages/vuikit-icons/dist', 'dist/vuikit-icons')
  ])
})
