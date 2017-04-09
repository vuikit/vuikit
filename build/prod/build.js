/* eslint-env shelljs */
require('shelljs/global')
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const rollup = require('rollup')
const uglify = require('uglify-js')
const util = require('../util')

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

let builds = require('./builds').getAllBuilds()

// filter builds via command line arg
if (process.argv[2]) {
  const filters = process.argv[2].split(',')
  builds = builds.filter(b => {
    return filters.some(f => b.dest.indexOf(f) > -1)
  })
} else {
  // filter out weex builds by default
  builds = builds.filter(b => {
    return b.dest.indexOf('weex') === -1
  })
}

build(builds)

function build (builds) {
  let built = 0
  const total = builds.length
  const next = () => {
    buildEntry(builds[built]).then(() => {
      built++
      if (built < total) {
        next()
      }
    }).catch(logError)
  }

  next()
}

function buildEntry (config) {
  const isProd = /min\.js$/.test(config.dest)
  return rollup.rollup(config).then(bundle => {
    const { code, map } = bundle.generate(config)

    if (isProd) {
      var minified = (config.banner ? config.banner + '\n' : '') + uglify.minify(code, {
        fromString: true,
        output: {
          screw_ie8: true,
          ascii_only: true
        },
        compress: {
          pure_funcs: ['makeMap']
        }
      }).code
      return write(config.dest, minified, map, true)
    } else {
      return write(config.dest, code, map)
    }
  })
}

function writeSourceMap (dest, map) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dest + '.map', map, err => {
      if (err) return reject(err)
      resolve()
    })
  })
}

function write (dest, code, map, zip) {
  return new Promise((resolve, reject) => {
    function report (extra) {
      console.log(util.blue(path.relative(process.cwd(), dest)) + ' ' + util.getSize(code) + (extra || ''))
      resolve()
    }

    if (map) {
      writeSourceMap(dest, map)
      code += `\n//# sourceMappingURL=${path.basename(dest)}.map`
    }

    fs.writeFile(dest, code, err => {
      if (err) return reject(err)
      if (zip) {
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err)
          report(' (gzipped: ' + util.getSize(zipped) + ')')
        })
      } else {
        report()
      }
    })
  })
}

function logError (e) {
  console.log(e)
}

/*
 * Compile Theme
 */

const compile = async (file, dist) => {
  try {
    let data = await util.read(file)

    // render less
    data = await util.renderLess(data, {
      relativeUrls: true,
      rootpath: '../../',
      paths: ['src/less/']
    })

    // write to file
    util.minify(await util.write(dist, data))
  } catch (err) {
    console.log(err)
  }
}

rm('-rf', 'dist/css')
mkdir('-p', 'dist/css')
compile('src/less/theme.less', 'dist/css/vuikit.css')
