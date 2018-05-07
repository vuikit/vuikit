import path from 'path'
import globby from 'globby'
import rollup from 'rollup'
import buble from 'rollup-plugin-buble'
import cleanup from 'rollup-plugin-cleanup'
import { remove, run, write, minifyJS } from '@miljan/build'

run(async () => {
  await remove('dist')

  // Compile Lib
  const resources = await globby(['src/icons/*', '!index.js'])

  await Promise.all(resources.map(async icon => {
    const basename = path.basename(icon)

    return compile(icon, basename, {
      output: {
        format: 'cjs'
      }
    })
  }))

  // Compile ESM
  await compile(
    'src/esm.js',
    'dist/vuikit-icons.esm.js',
    {
      output: {
        format: 'es'
      }
    }
  )

  // Compile CJS
  await compile(
    'src/cjs.js',
    'dist/vuikit-icons.cjs.js',
    {
      output: {
        format: 'cjs'
      }
    }
  )

  // Compile UMD
  await compile('src/cjs.js', 'dist/vuikit-icons.js', {
    output: {
      name: 'VuikitIcons',
      format: 'umd'
    }
  })

  await minifyJS({
    src: 'dist/vuikit-icons.js',
    dest: 'dist/vuikit-icons.min.js',
    options: {
      sourceMap: true
    }
  })
})

async function compile (input, dest, opts = {}) {
  const config = {
    input,
    output: opts.output,
    plugins: [
      buble(),
      cleanup()
    ]
  }

  const bundle = await rollup.rollup(config)
  const { code } = await bundle.generate(config.output)

  await write(dest, code, { log: true })
}
