// import { each, merge } from 'helpers/util'
// import { filter } from 'lodash'

export default {
  name: 'VkDocsLayoutPage',
  functional: true,
  render (h, { children, props, parent, data }) {
    return h('div',
      [ children ]
    )
  }
}

// const Menu = {
//   functional: true,
//   props: ['section'],
//   render (h, { props, parent }) {
//     const { section } = props
//     const items = []
//     const routes = filter(parent.$root._router.options.routes, route =>
//       route.meta && route.meta.section === section
//     )
//     each(routes, route => {
//       if (route.path !== '*') {
//         items.push(
//           h(MenuItem, merge({
//             props: {
//               route
//             }
//           }))
//         )
//       }
//     })
//     return items
//   }
// }
//
// const MenuItem = {
//   functional: true,
//   props: ['route'],
//   render (h, { props, parent }) {
//     return (
//       <router-link tag="li" to={ props.route.path } exact>
//         <a>{ props.route.name }</a>
//       </router-link>
//     )
//   }
// }
