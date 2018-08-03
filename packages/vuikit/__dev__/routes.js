export default [
  {
    path: '/',
    component: require('.').default
  },

  {
    path: '/core/components/transition',
    component: require('../src/_core/components/transition/__dev__/default').default
  },
  {
    path: '/core/directives/position',
    component: require('../src/_core/directives/position/__dev__/default').default
  },
  {
    path: '/core/directives/root',
    component: require('../src/_core/directives/root/__dev__/default').default
  },
  {
    path: '/breadcrumb',
    component: require('../src/breadcrumb/__dev__/default').default
  },
  {
    path: '/button',
    component: require('../src/button/__dev__/default').default
  },
  {
    path: '/card',
    component: require('../src/card/__dev__/default').default
  },
  {
    path: '/drop',
    component: require('../src/drop/__dev__/default').default
  },
  {
    path: '/drop-boundary',
    component: require('../src/drop/__dev__/boundary').default
  },
  {
    path: '/drop-position',
    component: require('../src/drop/__dev__/position').default
  },
  {
    path: '/dropdown',
    component: require('../src/dropdown/__dev__/default').default
  },
  {
    path: '/form-input',
    component: require('../src/form/__dev__/input/default').default
  },
  {
    path: '/form-input-elements',
    component: require('../src/form/__dev__/input/elements').default
  },

  {
    path: '/form-textarea',
    component: require('../src/form/__dev__/textarea/default').default
  },
  {
    path: '/form-textarea-elements',
    component: require('../src/form/__dev__/textarea/elements').default
  },

  {
    path: '/form-select',
    component: require('../src/form/__dev__/select/default').default
  },
  {
    path: '/form-select-elements',
    component: require('../src/form/__dev__/select/elements').default
  },

  {
    path: '/form-radio',
    component: require('../src/form/__dev__/radio/default').default
  },
  {
    path: '/form-radio-elements',
    component: require('../src/form/__dev__/radio/elements').default
  },

  {
    path: '/form-checkbox',
    component: require('../src/form/__dev__/checkbox/default').default
  },
  {
    path: '/form-checkbox-elements',
    component: require('../src/form/__dev__/checkbox/elements').default
  },

  {
    path: '/form-range',
    component: require('../src/form/__dev__/range/default').default
  },
  {
    path: '/form-range-elements',
    component: require('../src/form/__dev__/range/elements').default
  },

  {
    path: '/form-layout',
    component: require('../src/form/__dev__/layout/default').default
  },
  {
    path: '/form-layout-elements',
    component: require('../src/form/__dev__/layout/elements').default
  },
  {
    path: '/grid',
    component: require('../src/grid/__dev__/default').default
  },
  {
    path: '/height-match',
    component: require('../src/height-match/__dev__/default').default
  },
  {
    path: '/height-viewport',
    component: require('../src/height-viewport/__dev__/default').default
  },
  {
    path: '/height-viewport-expand',
    component: require('../src/height-viewport/__dev__/expand').default
  },
  {
    path: '/icon',
    component: require('../src/icon/__dev__/default').default
  },
  {
    path: '/iconnav',
    component: require('../src/iconnav/__dev__/default').default
  },
  {
    path: '/label',
    component: require('../src/label/__dev__/default').default
  },
  {
    path: '/list',
    component: require('../src/list/__dev__/default').default
  },
  {
    path: '/margin',
    component: require('../src/margin/__dev__/default').default
  },
  {
    path: '/modal',
    component: require('../src/modal/__dev__/default').default
  },
  {
    path: '/nav',
    component: require('../src/nav/__dev__/default').default
  },
  {
    path: '/navbar',
    component: require('../src/navbar/__dev__/default').default
  },
  {
    path: '/navbar-dropbar',
    component: require('../src/navbar/__dev__/dropbar').default
  },
  {
    path: '/navbar-dropdown',
    component: require('../src/navbar/__dev__/dropdown').default
  },
  {
    path: '/notification',
    component: require('../src/notification/__dev__/default').default
  },
  {
    path: '/offcanvas',
    component: require('../src/offcanvas/__dev__/default').default
  },
  {
    path: '/pagination',
    component: require('../src/pagination/__dev__/default').default
  },
  {
    path: '/scroll',
    component: require('../src/scroll/__dev__/default').default
  },
  {
    path: '/scrollspy',
    component: require('../src/scrollspy/__dev__/default').default
  },
  {
    path: '/section',
    component: require('../src/section/__dev__/default').default
  },
  {
    path: '/scrollspy-nav',
    component: require('../src/scrollspy/__dev__/nav').default
  },
  {
    path: '/spinner',
    component: require('../src/spinner/__dev__/default').default
  },
  {
    path: '/sticky',
    component: require('../src/sticky/__dev__/default').default
  },
  {
    path: '/subnav',
    component: require('../src/subnav/__dev__/default').default
  },
  {
    path: '/table',
    component: require('../src/table/__dev__/default').default
  },
  {
    path: '/tabs',
    component: require('../src/tabs/__dev__/default').default
  },
  {
    path: '/tabs-vertical',
    component: require('../src/tabs/__dev__/vertical').default
  },
  {
    path: '/tabs-elements',
    component: require('../src/tabs/__dev__/elements').default
  },
  {
    path: '/tooltip',
    component: require('../src/tooltip/__dev__/default').default
  },

  {
    path: '*',
    redirect: '/'
  }
]
