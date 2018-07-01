import { pick, get } from 'vuikit/src/_core/utils/object'

export default {
  methods: {
    pickComponentProps (obj, component) {
      const props = get(this, `$options.components.${component}.props`, {})
      return pick(obj, Object.keys(props))
    }
  }
}
