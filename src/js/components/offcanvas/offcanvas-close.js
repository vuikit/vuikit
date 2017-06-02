import Svg from '../icon/svg'
import Icon from 'icons/components/close-icon'

export default {
  functional: true,
  render (h, { data }) {
    return h('button', {
      staticClass: 'uk-offcanvas-close uk-close uk-icon',
      attrs: {
        type: 'button'
      },
      on: data.on
    }, [
      h(Svg, {
        props: {
          ...Icon
        }
      })
    ])
  }
}
