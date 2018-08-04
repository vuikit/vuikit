import { each } from 'vuikit/src/_core/utils/object'
import * as directives from './directives'

export * from './directives'

export default {
  directives,
  install (Vue) {
    each(directives, (def, name) => Vue.directive(name, def))
  }
}
