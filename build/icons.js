/* eslint-disable no-unused-vars */

const fs = require('fs')
const path = require('path')
const glob = require('glob')
const util = require('./util')

const iconsSource = 'node_modules/uikit/src/images/icons/*.svg'
const targetPath = path.resolve(__dirname, '../src/icons')

// the template file which to generate icon files
const template =
`export default {
  name: '#{name}',
  data: '#{data}',
  width: #{width},
  height: #{height},
  viewBox: '#{viewBox}'
}
`

async function processIcons (src) {
  try {
    const icons = await util.readIcons(src)

    // for each icon
    for (let name in icons) {
      let icon = icons[name]

      // optimize
      icon = await util.optimizeIcon(icon)

      const data = icon.data.replace(/<svg[^>]+>/gi, '').replace(/<\/svg>/gi, '')
      let viewBox = icon.data.match(/viewBox="([\d.]+\s[\d.]+\s[\d.]+\s[\d.]+)"/)

      if (viewBox && viewBox.length > 1) {
        viewBox = viewBox[1]
      }

      const content = util.compileTmpl(template, {
        name,
        data,
        width: parseFloat(icon.info.width) || 20,
        height: parseFloat(icon.info.height) || 20,
        viewBox: viewBox
      })

      // save file
      util.write(`${targetPath}/${name}.js`, content)
    }
  } catch (err) {
    console.log(err)
  }
}

processIcons(iconsSource)
