import { each, merge } from '../helpers/util'

export default {
  name: 'VkDocsLayoutPage',
  functional: true,
  render (h, { children, props, parent, data }) {
    // prepare menu items
    const menuItems = createMenu(h, parent.$root.routes)
    // const menuItemsOffcanvas = createMenu(h, parent.$root.routes)
    // <div id="tm-offcanvas" class="uk-offcanvas">
    //   <div class="uk-offcanvas-bar">
    //     <ul class="uk-nav tm-nav">{
    //       menuItemsOffcanvas
    //     }</ul>
    //   </div>
    // </div>
    return (
      <div>
        <nav class="uk-navbar">
          <a class="uk-navbar-toggle uk-visible-small"
            href="#tm-offcanvas"
            data-uk-offcanvas>
          </a>
        </nav>
        <div class="uk-block">
          <div class="uk-container uk-container-center">
            <div class="uk-grid" data-uk-grid-margin>
              <div class="tm-sidebar uk-width-medium-1-4 uk-hidden-small">
                <ul class="uk-nav tm-nav">{
                  menuItems
                }</ul>
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

function createMenu (h, routes) {
  const items = []
  each(routes, (route, path) => items.push(
    h(MenuItem, merge({
      props: {
        name: route.name,
        path
      }
    }))
  ))
  return items
}

const MenuItem = {
  functional: true,
  props: {
    name: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
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
        }}>
          { props.name }
        </a>
      </li>
    )
  }
}
