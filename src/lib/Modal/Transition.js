import { debounce } from 'lodash'
import { on, css, addClass, removeClass } from '../../helpers/dom'

const html = document.documentElement
const body = document.body

let active
let activeCount

// init window events
const events = ['resize', 'orientationchange']
for (let i = 0; i < events.length; ++i) {
  on(window, events[i], debounce(e =>
    active && resize(active.$el, active.center),
  150))
}

// init keyboard events
on(document, 'keyup', e => {
  if (active && e.keyCode === 27) {
    e.preventDefault()
    active.$emit('keyEsc')
  }
})

export default {
  functional: true,
  render (h, { props, parent, children }) {
    return h('transition', {
      props: {
        name: parent.transition
      },
      on: {
        beforeEnter: () => {
          parent.$nextTick(() => {
            addClass(html, 'uk-modal-page')
            resize(parent.$el, parent.center)
          })
        },
        afterEnter: () => {
          if (active) {
            active.$emit('inactive')
          }
          active = parent
        },
        afterLeave: () => {
          activeCount > 0
            ? activeCount--
            : activeCount = 0
          if (!activeCount) {
            removeClass(html, 'uk-modal-page')
            body.style[parent.paddingDir] = ''
          }
          if (active === parent) {
            active = false
          }
        }
      }
    }, [ children ])
  }
}

function resize (modal, center) {
  const dialog = modal.childNodes[0]
  const bodyWidth = body.offsetWidth
  const scrollbarWidth = window.innerWidth - bodyWidth
  const lngDir = html.getAttribute('dir') === 'rtl'
    ? 'right'
    : 'left'
  const paddingDir = 'padding-' + (lngDir === 'left'
    ? 'right'
    : 'left')
  body.style[paddingDir] = scrollbarWidth
  modal.style['overflow-y'] = scrollbarWidth
    ? 'scroll'
    : 'auto'
  if (center) {
    const dh = dialog.offsetHeight
    const marginTop = css(dialog, 'margin-top')
    const marginBottom = css(dialog, 'margin-bottom')
    const pad = parseInt(marginTop, 10) + parseInt(marginBottom, 10)
    if ((dh + pad) < window.innerHeight) {
      const top = (window.innerHeight / 2 - dh / 2) - pad
      dialog.style.top = `${top}px`
    } else {
      dialog.style.top = ''
    }
  } else {
    dialog.style.top = ''
  }
}
