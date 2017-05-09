const fs = require('fs')
const path = require('path')
const ora = require('ora')
const less = require('less')
const webpack = require('webpack')
const rollup = require('rollup')
const replace = require('rollup-plugin-replace')
const CleanCSS = require('clean-css')
const uglify = require('uglify-js')
const mkdirp = require('mkdirp')
const rmrf = require('rmrf')
const glob = require('glob')
const SVGO = require('svgo')

const svgo = new SVGO({
  plugins: [
    { removeTitle: true },
    { removeStyleElement: true },
    { removeComments: true },
    { removeDesc: true },
    { removeUselessDefs: true },
    { cleanupIDs: { remove: true } },
    { convertShapeToPath: true }
  ]
})

exports.read = function (file, callback) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      }

      resolve(data)
      callback && callback(data)
    })
  })
}

exports.write = function (dest, data, map) {
  return new Promise((resolve, reject) =>
    mkdirp(path.dirname(dest), err => {
      if (err) {
        reject(err)
      }

      if (map) {
        writeSourceMap(dest, map)
        data += `\n//# sourceMappingURL=${path.basename(dest)}.map`
      }

      fs.writeFile(dest, data, err => {
        if (err) {
          return reject(err)
        }
        exports.logFile(dest)
        resolve(dest)
      })
    })
  )
}

function writeSourceMap (dest, map) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dest + '.map', map, err => {
      if (err) return reject(err)
      resolve()
    })
  })
}

exports.renderLess = function (data, options) {
  return less.render(data, options).then(output => output.css)
}

exports.minify = function (file) {
  return new CleanCSS({
    advanced: false,
    keepSpecialComments: 0,
    rebase: false,
    returnPromise: true
  }).minify([file]).then(minified => exports.write(
    `${path.join(path.dirname(file),
    path.basename(file, '.css'))}.min.css`,
    minified.styles
  ))
}

exports.minifyJS = function (code) {
  return uglify.minify(code, {
    fromString: true,
    output: {
      screw_ie8: true,
      ascii_only: true
    },
    compress: {
      pure_funcs: ['makeMap']
    }
  }).code
}

exports.logFile = function (file) {
  const filePath = path.relative(process.cwd(), file)
  exports.read(file).then(data =>
    console.log(`${exports.cyan(filePath)} ${exports.getSize(data)}`)
  )
}

function logError (e) {
  console.log(e)
}

exports.getSize = function (data) {
  return `${(data.length / 1024).toFixed(2)}kb`
}

exports.cyan = function (str) {
  return `\x1b[1m\x1b[36m${str}\x1b[39m\x1b[22m`
}

// delete all content from a folder
exports.cleanPath = function (path) {
  rmrf(path)
  mkdirp(path)
}

// runs a webpack build
exports.webpackBuild = function (config, msg) {
  const spinner = ora(msg || 'building for production...')
  spinner.start()
  webpack(config, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
  })
}

// runs a rollup build
exports.rollupBuild = function (config, builds) {
  let built = 0
  const total = builds.length

  const next = () => {
    buildEntry(config, builds[built]).then(() => {
      built++
      if (built < total) {
        next()
      }
    }).catch(logError)
  }

  next()
}

function buildEntry (config, build) {
  const isProd = /min\.js$/.test(build.dest)
  config = Object.assign({}, config, build)

  if (config.env) {
    config.plugins.push(replace({
      'process.env.NODE_ENV': JSON.stringify(config.env)
    }))
    delete config.env
  }

  return rollup.rollup(config).then(bundle => {
    const { code, map } = bundle.generate(config)

    if (isProd) {
      const banner = config.banner
        ? config.banner + '\n'
        : ''
      const minified = banner + exports.minifyJS(code)
      return exports.write(config.dest, minified, map)
    }

    return exports.write(config.dest, code)
  })
}

exports.readIcons = function (src) {
  return glob.sync(src, { nosort: true }).reduce((icons, file) => {
    const name = path.basename(file, '.svg')
    const data = fs.readFileSync(file).toString().trim().replace(/\n/g, '').replace(/>\s+</g, '><')
    icons[name] = data
    return icons
  }, {})
}

exports.optimizeIcon = function (icon) {
  return new Promise((resolve, reject) => {
    svgo.optimize(icon, result => {
      resolve(result)
    })
  })
}

// simple template compile
exports.compileTmpl = function (content, data) {
  return content.replace(/#{(\w+)}/gi, function (match, name) {
    return data[name] ? data[name] : ''
  })
}
