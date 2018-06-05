import { mergeData } from 'vuikit/src/_core/utils/vue'
import * as elements from '../elements'

const { ElCardMedia, ElCardMediaTop, ElCardMediaBottom } = elements
const { ElCard, ElCardBadge, ElCardHeader, ElCardBody, ElCardFooter } = elements

export default {
  functional: true,
  props: ElCard.props,
  render (h, { props, data, slots }) {
    const _slots = slots()
    let body = _slots.body

    // if only default slot provided
    // assume is the body content
    if (!body || !body.length) {
      _slots.body = _slots.default
      delete _slots.default
    }

    return h(ElCard, mergeData(data, { props }), [
      _slots.default && _slots.default,
      _slots['media-top'] && h(ElCardMediaTop, _slots['media-top']),
      _slots.badge && h(ElCardBadge, _slots.badge),
      _slots.header && h(ElCardHeader, _slots.header),
      _slots['media'] && h(ElCardMedia, _slots['media']),
      _slots.body && h(ElCardBody, _slots.body),
      _slots.footer && h(ElCardFooter, _slots.footer),
      _slots['media-bottom'] && h(ElCardMediaBottom, _slots['media-bottom'])
    ])
  }
}
