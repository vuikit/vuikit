import { each, merge } from '../helpers/util'

export default {
  name: 'VkDocsLayoutPage',
  functional: true,
  render (h, { children, props, parent, data }) {
    return (
      <div>
        <nav class="uk-navbar">
          <a class="uk-navbar-toggle uk-visible-small"
            on-click={e => { parent.$root.showOffcanvas = true }}>
          </a>
        </nav>
        <vk-offcanvas
          show={ parent.$root.showOffcanvas }
          on-clickOut={e => { parent.$root.showOffcanvas = false }}>
          <ul class="uk-nav tm-nav uk-nav-offcanvas">
            { h(Menu) }
          </ul>
        </vk-offcanvas>
        <div class="uk-block">
          <div class="uk-container uk-container-center">
            <div class="uk-grid" data-uk-grid-margin>
              <div class="tm-sidebar uk-width-medium-1-4 uk-hidden-small">
                <ul class="uk-nav tm-nav">
                  { h(Menu) }
                </ul>
              </div>
              <div class="uk-width-medium-3-4">
                <article class="uk-article">
                  { children }
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const Menu = {
  functional: true,
  render (h, { props, parent }) {
    const items = []
    each(parent.$root.routes, (route, path) => items.push(
      h(MenuItem, merge({
        props: {
          name: route.name,
          path
        }
      }))
    ))
    return items
  }
}

const MenuItem = {
  functional: true,
  props: ['name', 'path'],
  render (h, { props, parent }) {
    return (
      <li class={{
        'uk-active': parent.$root.currentRoute === props.path
      }}>
        <a on-click={() => {
          parent.$root.currentRoute = props.path
          window.history.pushState(
            null,
            parent.$root.routes[props.path],
            props.path
          )
          // close offcanvas
          parent.$nextTick(() => {
            parent.$root.showOffcanvas = false
          })
        }}>
          { props.name }
        </a>
      </li>
    )
  }
}
