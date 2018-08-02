<script>
import * as elements from '../elements'
import mixinProps from 'vuikit/src/_core/mixins/props'

export default {
  functional: true,
  name: 'VkCard',
  mixins: [mixinProps],
  props: elements.ElCard.props,
  render (h, { data, slots }) {
    const _slots = slots()

    return h(elements.ElCard, data, [
      _slots.top,
      _slots['media-top'] && h(elements.ElCardMediaTop, [
        _slots['media-top']
      ]),
      _slots['badge'] && h(elements.ElCardBadge, [
        _slots['badge']
      ]),
      _slots['header'] && h(elements.ElCardHeader, [
        _slots['header']
      ]),
      _slots['media'] && h(elements.ElCardMedia, [
        _slots['media']
      ]),
      _slots['default'] && h(elements.ElCardBody, [
        _slots['default']
      ]),
      _slots['footer'] && h(elements.ElCardFooter, [
        _slots['footer']
      ]),
      _slots['media-bottom'] && h(elements.ElCardMediaBottom, [
        _slots['media-bottom']
      ]),
      _slots['bottom']
    ])
  }
}
</script>
