export default [
  {
    path: '/',
    component: require('.').default
  },

  {
    name: 'offcanvas',
    path: '/offcanvas',
    component: require('../src/offcanvas/__dev__/default').default
  },

  {
    path: '*',
    redirect: '/'
  }
]
