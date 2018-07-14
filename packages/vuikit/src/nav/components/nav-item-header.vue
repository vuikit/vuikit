<script>
import { ElNavItemHeader } from '../elements'

export default {
  functional: true,
  name: 'VkNavItemHeader',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  render (h, { props, data }) {
    return h(ElNavItemHeader, data, props.title)
  }
}
</script>
