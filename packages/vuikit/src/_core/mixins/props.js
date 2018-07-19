import { pick, get } from 'vuikit/src/_core/utils/object'
import { extractProps } from 'vuikit/src/_core/utils/vue'

export default {
  methods: {
    pickComponentProps (obj, comp) {
      const component = get(this, `$options.components.${comp}`, {})
      const props = extractProps(component)
      return pick(obj, Object.keys(props))
    }
  }
}
