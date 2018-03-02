export const content = (h, slots) => {
  return [
    // left slot
    slots.left && h('div', { class: 'uk-navbar-left' }, slots.left),

    (slots.center || slots['center-left'] || slots['center-right']) && h('div', {
      class: 'uk-navbar-center'
    }, [
      // center-left slot
      slots['center-left'] && h('div', {
        class: 'uk-navbar-center-left'
      }, [ h('div', slots['center-left']) ]),
      // center slot
      slots.center && slots.center,
      // center-right slot
      slots['center-right'] && h('div', {
        class: 'uk-navbar-center-right'
      }, [ h('div', slots['center-right']) ])
    ]),

    // right slot
    slots.right && h('div', { class: 'uk-navbar-right' }, slots.right)
  ]
}
