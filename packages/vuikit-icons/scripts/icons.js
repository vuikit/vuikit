import { compile, buildExportIndex } from '../util'

import read from '@lump/read'
import remove from '@lump/remove'

const src = 'packages/vuikit-icons'

;(async () => {
  const tmpl = await read(`${src}/icon.tmpl`)
  await remove(`${src}/lib`)

  // compile uikit icons
  await compile({
    tmpl,
    src: 'node_modules/uikit/src/images/icons/*.svg',
    dest: `${src}/lib`
  })

  await buildExportIndex({
    src: `${src}/lib/*.js`,
    dest: `${src}/lib/_import.js`
  })

  // compile custom icons
  await remove(`${src}/custom/_result`)
  await compile({
    tmpl,
    src: `${src}/custom/*.svg`,
    dest: `${src}/custom/_result`
  })
})()
