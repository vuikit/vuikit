var version = require('./package.json').version

module.exports = {
  banner:
    '/*!\n' +
    ' * Vuikit v' + version + ' (https://github.com/vuikit/vuikit)\n' +
    ' * (c) ' + new Date().getFullYear() + ' ZOOlanders\n' +
    ' * Released under the MIT License.\n' +
    ' */'
}
