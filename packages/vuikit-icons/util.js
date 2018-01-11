import fs from 'fs'
import path from 'path'
import globby from 'globby'

import write from '@lump/write'

export async function compile ({ src, dest, tmpl }) {
  const srcIcons = await readIcons(src)
  const icons = []

  // for each icon
  for (let name in srcIcons) {
    let icon = srcIcons[name]

    // get main attributes
    const width = getAttr('width', icon)
    const height = getAttr('height', icon)
    const viewBox = getAttr('viewBox', icon)

    // get data
    const data = icon
      // remove all new lines and white spaces
      .toString().trim().replace(/\n/g, '').replace(/>\s+</g, '><')
      // remove svg tag wrapper
      .replace(/<svg[^>]+>/gi, '').replace(/<\/svg>/gi, '')

      // compile into provided template
    const content = compileTmpl(tmpl, {
      name,
      data,
      width: parseFloat(width) || 20,
      height: parseFloat(height) || 20,
      viewBox: viewBox || `0 0 ${width} ${height}`
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

function compileTmpl (content, data) {
  return content.replace(/#{(\w+)}/gi, function (match, name) {
    return data[name] ? data[name] : ''
  })
}

export async function buildExportIndex ({ src, dest }) {
  const icons = await globby.sync(src)
  const index = []

  icons.forEach(iconPath => {
    const name = getIconName(iconPath)
    const importPath = path.basename(iconPath)

    index.push(`export { default as ${name} } from './${importPath}'`)
  })

  await write(dest, index.join('\n') + '\n')
}

function getIconName (iconPath) {
  let name

  name = path.basename(iconPath)
  name = name.replace('.js', '')
  name = camelize(`Icon-${name}`)

  return name
}

const camelizeRE = /-(\w)/g
function camelize (str) {
  return str.replace(camelizeRE, toUpper)
}

function toUpper (_, c) {
  return c ? c.toUpperCase() : ''
}

function getAttr (name, svg) {
  const rx = new RegExp(`${name}="([\\d\\s]+)"`)
  const match = svg.match(rx)

  return (match && match[1]) || match
}
