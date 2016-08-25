import { addClass, removeClass } from '../../helpers/dom'

const html = document.documentElement
const body = document.body
let scrollPos = {}

export default {
  functional: true,
  render (h, { parent, children }) {
    return h('transition', {
      props: {
        name: parent.transition
      },
      on: {
        beforeEnter: () => {
          // save scroll position before applying any transition
          scrollPos = { x: window.pageXOffset, y: window.pageYOffset }
          // apply transitions on nextTick as the bar offsetWidth
          // will return 0 if is not displayed
          parent.$nextTick(() => {
            const scrollbarWidth = window.innerWidth - body.offsetWidth
            addClass(body, 'uk-offcanvas-page')
            addClass(body, 'uk-offcanvas-page-open')
            setBodyMargin(parent.flip, parent.$refs.bar.offsetWidth)
            body.style.width = window.innerWidth - scrollbarWidth + 'px'
            body.style.height = window.innerHeight + 'px'
            body.offsetHeight // force redraw
            // apply margin in order to emulate the
            // scroll position despite fixed display
            html.style['margin-top'] = scrollPos.y * -1 + 'px'
          })
        },
        beforeLeave: () => {
          // trigger transitons
          removeClass(body, 'uk-offcanvas-page-open')
          body.style['margin-left'] = ''
          body.style['margin-right'] = ''
        },
        afterLeave: () => {
          // reset all to previous state
          removeClass(body, 'uk-offcanvas-page')
          body.style.width = ''
          body.style.height = ''
          html.style['margin-top'] = ''
          window.scrollTo(scrollPos.x, scrollPos.y)
        }
      }
    }, children)
  }
}

function setBodyMargin (flip, barWidth) {
  const lngDir = html.getAttribute('dir') === 'rtl'
    ? 'right'
    : 'left'
  const rtl = lngDir === 'right'
  const dir = (flip ? -1 : 1) * (rtl ? -1 : 1)
  const margin = (rtl ? -1 : 1) * (barWidth * dir)
  body.style[rtl ? 'margin-right' : 'margin-left'] = margin + 'px'
}
