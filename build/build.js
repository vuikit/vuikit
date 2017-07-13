const fs = require('fs')
const path = require('path')
const util = require('@vuikit/util')
const alias = require('./alias.js')
const pkg = require('../package.json')

util.checkNode(pkg.engines)

util.run(async _ => {

  await util.task({
    text: 'Build',
    task: () => Promise.all([
      buildCommon(),
      buildEs(),
      buildUmd(),
      ...getEsBuilds().map(async (build) => {
        await util.buildRollup(build)
      })
    ])
  })

  await util.compileLess({
    src: 'src/less/theme.less',
    dest: 'dist/vuikit.css',
    options: {
      relativeUrls: true,
      rootpath: '../../',
      paths: ['src/less/']
    }
  })

  await util.fileMinify({
    src: 'dist/vuikit.css'
  })

  await util.banner({
    src: 'dist/*',
    product: 'Vuikit',
    version: pkg.version,
    license: pkg.license,
    author: 'Miljan Aleksic'
  })

})

async function buildCommon () {
  util.buildRollup({
    entry: resolve('build/prod/dist.js'),
    dest: resolve('dist/vuikit.common.js'),
    format: 'cjs',
    env: 'development',
    alias
  })
}

async function buildEs () {
  await util.buildRollup({
    entry: resolve('build/prod/dist-esm.js'),
    dest: resolve('dist/vuikit.esm.js'),
    format: 'es',
    env: 'development',
    alias
  })
}

async function buildUmd () {
  await util.buildRollup({
    entry: resolve('build/prod/dist.js'),
    dest: resolve('dist/vuikit.js'),
    format: 'umd',
    env: 'production',
    moduleName: 'Vuikit',
    alias
  })

  await util.fileMinify({
    src: 'dist/vuikit.js'
  })

  // override umd with development env
  await util.buildRollup({
    entry: resolve('build/prod/dist.js'),
    dest: resolve('dist/vuikit.js'),
    format: 'umd',
    env: 'development',
    moduleName: 'Vuikit',
    alias
  })
}

function getEsBuilds () {
  return getDirectories(
    resolve('src/js/components/')
  ).map(component => {
    return {
      entry: resolve(`src/js/components/${component}/index.js`),
      dest: resolve(`dist/es/${component}.js`),
      alias,
      format: 'es',
      env: 'development'
    }
  })
}

function getDirectories (srcpath) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory())
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
