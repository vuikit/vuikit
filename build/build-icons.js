const fs = require('fs')
const path = require('path')
const globby = require('globby')
const SVGO = require('svgo')

const lumpit = require('@lump/it')
const write = require('@lump/write')

lumpit(async () => {
  // uikit component
  await compileIcons({
    src: 'node_modules/uikit/src/images/components/*.svg',
    dest: 'icons/components'
  })

  await compileIcons({
    src: 'node_modules/uikit/src/images/icons/*.svg',
    dest: 'icons'
  })

  // custom icons
  await compileIcons({
    src: 'custom-icons/*.svg',
    dest: 'custom-icons/result'
  })
})

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

// the template file which to generate icon files
const iconTmpl =
`module.exports = {
  name: '#{name}',
  data: '#{data}',
  viewBox: '#{viewBox}',
  width: #{width},
  height: #{height}
}
`

async function compileIcons ({ src, dest }) {
  const srcIcons = await readIcons(src)
  const icons = []

  // for each icon
  for (let name in srcIcons) {
    let icon = srcIcons[name]

    // optimize
    icon = await optimizeIcon(icon)

    const data = icon.data.replace(/<svg[^>]+>/gi, '').replace(/<\/svg>/gi, '')
    const width = parseFloat(icon.info.width) || 20
    const height = parseFloat(icon.info.height) || 20

    const content = compileTmpl(iconTmpl, {
      name,
      data,
      width,
      height,
      viewBox: `0 0 ${width} ${height}`
    })

    // save file
    await write(`${dest}/${name}.js`, content)

    icons.push({ content, name })
  }

  return icons
}

async function readIcons (src) {
  const files = await globby(src, {
    nosort: true
  })

  return files.reduce((icons, file) => {
    const name = path.basename(file, '.svg')
    const data = fs.readFileSync(file).toString().trim().replace(/\n/g, '').replace(/>\s+</g, '><')
    icons[name] = data
    return icons
  }, {})
}

function optimizeIcon (icon) {
  return new Promise((resolve, reject) => {
    svgo.optimize(icon, result => {
      resolve(result)
    })
  })
}

function compileTmpl (content, data) {
  return content.replace(/#{(\w+)}/gi, function (match, name) {
    return data[name] ? data[name] : ''
  })
}
