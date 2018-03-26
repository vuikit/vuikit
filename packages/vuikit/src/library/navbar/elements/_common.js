import ElementNavbarNavigation from './navbar--navigation'

export function renderSlots (h, slots) {
  return [
    // left slot (default)
    (slots.left || slots.default) && h(ElementNavbarNavigation, [
      slots.left, slots.default
    ]),

    (slots.center || slots['center-left'] || slots['center-right']) && h(ElementNavbarNavigation, {
      props: { align: 'center' }
    }, [
      // center-left slot
      slots['center-left'] && h(ElementNavbarNavigation, {
        props: { align: 'center-left' }
      }, slots['center-left']),
      // center slot
      slots.center && slots.center,
      // center-right slot
      slots['center-right'] && h(ElementNavbarNavigation, {
        props: { align: 'center-right' }
      }, slots['center-right'])
    ]),

    // right slot
    slots.right && h(ElementNavbarNavigation, {
      props: { align: 'right' }
    }, slots.right)
  ]
}
