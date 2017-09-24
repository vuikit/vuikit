import { warn as _warn } from '@vuikit/util'

export function warn (msg, vm) {
  return _warn(`[Vuikit Warn]: ${msg}`, vm)
}
