const pkg = require('../package.json')
const util = require('@vuikit/util')

util.checkNode(pkg.engines)

util.run(async _ => {

  // uikit component
  await util.compileIcons({
    src: 'node_modules/uikit/src/images/components/*.svg',
    dest: 'icons/components'
  })

  await util.compileIcons({
    src: 'node_modules/uikit/src/images/icons/*.svg',
    dest: 'icons'
  })

  // custom icons
  await util.compileIcons({
    src: 'custom-icons/*.svg',
    dest: 'custom-icons/result'
  })

})
