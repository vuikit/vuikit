const lumpit = require('@lump/it')
const remove = require('@lump/remove')

const Compile = require('./tasks/compile')
const Banner = require('./tasks/banner')

lumpit(async () => {
  await remove('dist')
  await Compile()
  await Banner()
})
