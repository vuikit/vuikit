import IconSpinner from '../../icons/spinner' // eslint-disable-line

export default {
  functional: true,
  props: ['ratio'],
  render (h, { props }) {
    return h('div', {
      class: ['uk-icon uk-spinner']
    }, [
      h(IconSpinner, {
        props: {
          ratio: props.ratio
        }
      })
    ])
  }
}
