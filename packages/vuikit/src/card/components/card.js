import * as elms from '../elements'
import mixinProps from 'vuikit/src/_core/mixins/props'

export default {
  functional: true,
  mixins: [mixinProps],
  props: elms.VkCardEl.props,
  render (h, { data, slots }) {
    const _slots = slots()

    return h(elms.VkCardEl, data, [
      _slots.top,
      _slots['media-top'] && h(elms.VkCardElMediaTop, [
        _slots['media-top']
      ]),
      _slots['badge'] && h(elms.VkCardElBadge, [
        _slots['badge']
      ]),
      _slots['header'] && h(elms.VkCardElHeader, [
        _slots['header']
      ]),
      _slots['media'] && h(elms.VkCardElMedia, [
        _slots['media']
      ]),
      _slots['default'] && h(elms.VkCardElBody, [
        _slots['default']
      ]),
      _slots['footer'] && h(elms.VkCardElFooter, [
        _slots['footer']
      ]),
      _slots['media-bottom'] && h(elms.VkCardElMediaBottom, [
        _slots['media-bottom']
      ]),
      _slots['bottom']
    ])
  }
}
