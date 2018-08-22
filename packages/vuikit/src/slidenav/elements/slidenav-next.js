import { mergeData } from 'vuikit/src/_core/utils/vue'

const small = `<svg width="14px" height="24px" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg">
  <polyline fill="none" stroke="#000" stroke-width="1.4" points="1.225,23 12.775,12 1.225,1" />
</svg>`

const large = `<svg width="25px" height="40px" viewBox="0 0 25 40" xmlns="http://www.w3.org/2000/svg">
    <polyline fill="none" stroke="#000" stroke-width="2" points="4.002,38.547 22.527,20.024 4,1.5" />
</svg>`

export default {
  functional: true,
  props: {
    enlarged: Boolean
  },
  render (h, { props, data }) {
    return h('a', mergeData(data, {
      class: ['uk-slidenav-next uk-icon uk-slidenav', {
        'uk-slidenav-large': props.enlarged
      }],
      domProps: {
        innerHTML: props.enlarged ? large : small
      }
    }))
  }
}
