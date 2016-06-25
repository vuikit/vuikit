export function configRouter (router) {
  router.map({
    '/alert': {
      name: 'Alert',
      component: require('./views/Alert')
    },
    '/breadcrumb': {
      name: 'Breadcrumb',
      component: require('./views/Breadcrumb')
    },
    '/button': {
      name: 'Button',
      component: require('./views/Button')
    },
    '/calendar': {
      name: 'Calendar',
      component: require('./views/Calendar')
    },
    '/datepicker': {
      name: 'Datepicker',
      component: require('./views/Datepicker')
    },
    '/modal': {
      name: 'Modal',
      component: require('./views/Modal')
    },
    '/pagination': {
      name: 'Pagination',
      component: require('./views/Pagination')
    },
    '/progress': {
      name: 'Progress',
      component: require('./views/Progress')
    },
    '/subnav': {
      name: 'Subnav',
      component: require('./views/Subnav')
    },
    '/switcher': {
      name: 'Switcher',
      component: require('./views/Switcher')
    },
    '/tabs': {
      name: 'Tabs',
      component: require('./views/Tabs')
    },
    '/upload': {
      name: 'Upload',
      component: require('./views/Upload')
    }
  })
  router.redirect({
    '/': '/alert'
  })
}
