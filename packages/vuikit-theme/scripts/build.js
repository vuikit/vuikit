import path from 'path'
import { run, remove, less, minifyCSS } from '@miljan/build'

run(async () => {
  try {
    await remove('dist')

    await less({
      src: 'src/_import.less',
      dest: 'dist/vuikit.css',
      options: {
        relativeUrls: true,
        paths: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../../../node_modules')
        ]
      }
    })

    await minifyCSS({
      src: 'dist/vuikit.css',
      dest: 'dist/vuikit.min.css',
      options: {
        sourceMap: true
      }
    })
  } catch (e) {
    console.log(e)
  }
})
