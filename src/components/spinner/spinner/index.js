import { IconSpinner } from '@vuikit/icons'

export default {
  name: 'Spinner',
  functional: true,
  props: ['ratio'],
  render (h, { props }) {
    return h('div', {
      staticClass: 'uk-icon uk-spinner'
    }, [
      h(IconSpinner, {
        props: {
          ratio: props.ratio
        }
      })
    ])
  }
}
