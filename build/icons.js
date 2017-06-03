const path = require('path')
const util = require('./util')

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

const exportTmpl = `export { default as #{iconCamel} } from './#{icon}'`

async function processIcons (src, dest) {
  try {
    const srcIcons = await util.readIcons(src)
    const icons = []

    // for each icon
    for (let name in srcIcons) {
      let icon = srcIcons[name]

      // optimize
      icon = await util.optimizeIcon(icon)

      const data = icon.data.replace(/<svg[^>]+>/gi, '').replace(/<\/svg>/gi, '')
      const width = parseFloat(icon.info.width) || 20
      const height = parseFloat(icon.info.height) || 20

      const content = util.compileTmpl(iconTmpl, {
        name,
        data,
        width,
        height,
        viewBox: `0 0 ${width} ${height}`
      })

      // save file
      util.write(`${dest}/${name}.js`, content)

      icons.push({ content, name })
    }

    return icons
  } catch (err) {
    console.log(err)
  }
}

// uikit icons
const dest = path.resolve(__dirname, '../icons')
processIcons('node_modules/uikit/src/images/icons/*.svg', dest).then(icons => {
  // save index
  const index = icons.map(icon => util.compileTmpl(exportTmpl, {
    icon: icon.name,
    iconCamel: util.camelize(icon.name)
  }))

  util.write(`${dest}/index.js`, `${index.join('\n')}\n`)
})

// uikit component icons
processIcons('node_modules/uikit/src/images/components/*.svg', 'icons/components')

// custom icons
processIcons('custom-icons/*svg', 'custom-icons/result')
