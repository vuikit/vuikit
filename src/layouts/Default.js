import { each, merge } from '../helpers/util'
import { filter } from 'lodash'

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
            <li class="uk-nav-header">Common</li>
            {
              h(Menu, {
                props: {
                  section: 'Common'
                }
              })
            }
            <li class="uk-nav-header">Navigation</li>
            {
              h(Menu, {
                props: {
                  section: 'Navigation'
                }
              })
            }
            <li class="uk-nav-header">Data</li>
            {
              h(Menu, {
                props: {
                  section: 'Data'
                }
              })
            }
            <li class="uk-nav-header">Display</li>
            {
              h(Menu, {
                props: {
                  section: 'Display'
                }
              })
            }
            <li class="uk-nav-header">Others</li>
            {
              h(Menu, {
                props: {
                  section: 'Others'
                }
              })
            }
            <li class="uk-nav-header">Examples</li>
            {
              h(Menu, {
                props: {
                  section: 'Examples'
                }
              })
            }
          </ul>
        </vk-offcanvas>
        <div class="uk-block">
          <div class="uk-container uk-container-center">
            <div class="uk-grid" data-uk-grid-margin>
              <div class="tm-sidebar uk-width-medium-1-4 uk-hidden-small">
                <ul class="uk-nav tm-nav">
                  <li class="uk-nav-header">Common</li>
                  {
                    h(Menu, {
                      props: {
                        section: 'Common'
                      }
                    })
                  }
                  <li class="uk-nav-header">Navigation</li>
                  {
                    h(Menu, {
                      props: {
                        section: 'Navigation'
                      }
                    })
                  }
                  <li class="uk-nav-header">Data</li>
                  {
                    h(Menu, {
                      props: {
                        section: 'Data'
                      }
                    })
                  }
                  <li class="uk-nav-header">Display</li>
                  {
                    h(Menu, {
                      props: {
                        section: 'Display'
                      }
                    })
                  }
                  <li class="uk-nav-header">Others</li>
                  {
                    h(Menu, {
                      props: {
                        section: 'Others'
                      }
                    })
                  }
                  <li class="uk-nav-header">Examples</li>
                  {
                    h(Menu, {
                      props: {
                        section: 'Examples'
                      }
                    })
                  }
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
  props: ['section'],
  render (h, { props, parent }) {
    const { section } = props
    const items = []
    const routes = filter(parent.$root._router.options.routes, route =>
      route.meta && route.meta.section === section
    )
    each(routes, route => {
      if (route.path !== '*') {
        items.push(
          h(MenuItem, merge({
            props: {
              route
            }
          }))
        )
      }
    })
    return items
  }
}

const MenuItem = {
  functional: true,
  props: ['route'],
  render (h, { props, parent }) {
    return (
      <router-link tag="li" to={ props.route.path } exact>
        <a>{ props.route.name }</a>
      </router-link>
    )
  }
}
