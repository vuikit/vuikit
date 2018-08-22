import { mergeData } from 'vuikit/src/_core/utils/vue'

const small = `<svg width="14px" height="24px" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg">
  <polyline fill="none" stroke="#000" stroke-width="1.4" points="12.775,1 1.225,12 12.775,23" />
</svg>`

const large = `<svg width="25px" height="40px" viewBox="0 0 25 40" xmlns="http://www.w3.org/2000/svg">
    <polyline fill="none" stroke="#000" stroke-width="2" points="20.527,1.5 2,20.024 20.525,38.547 " />
</svg>`

export default {
  functional: true,
  props: {
    enlarged: Boolean
  },
  render (h, { props, data }) {
    return h('a', mergeData(data, {
      class: ['uk-slidenav-previous uk-icon uk-slidenav', {
        'uk-slidenav-large': props.enlarged
      }],
      domProps: {
        innerHTML: props.enlarged ? large : small
      }
    }))
  }
}
