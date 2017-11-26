import IconClose from '~/icons/close-icon'

export default {
  functional: true,
  render: (h, { data }) =>

    h('button', {
      class: 'uk-offcanvas-close uk-close uk-icon',
      attrs: {
        type: 'button'
      },
      on: data.on
    }, [
      h(IconClose)
    ])

}
