import { warn as _warn } from '@vuikit/util'

export function warn (msg, vm) {
  return _warn({ prefix: 'Vuikit Warn', msg, vm })
}
