import Vue from 'vue'
import * as vuikit from 'src/js/vuikit'
import explorer from 'vuikit-explorer'

// register Vuikit components
const keys = Object.keys(vuikit)
let i = keys.length
while (i--) {
  Vue.component(`Vk${keys[i]}`, vuikit[keys[i]])
}

explorer({
  title: 'Vuikit'
})
.add('Basic', [
  ['Button', require('./scenarios/basic/button.vue')],
  ['Button Checkbox', require('./scenarios/basic/button-checkbox.vue')],
  ['Button Radio', require('./scenarios/basic/button-radio.vue')],
  ['Icon', require('./scenarios/basic/icon.vue')]
])
.add('Data', [
  ['Table', require('./scenarios/data/table/index.vue')]
])
.add('Navigation', [
  ['Dropdown', require('./scenarios/navigation/dropdown/default.vue')],
  ['Breadcrumb', require('./scenarios/navigation/breadcrumb.vue')],
  ['Pagination', require('./scenarios/navigation/pagination.vue')],
  ['Subnav', require('./scenarios/navigation/subnav.vue')],
  ['Tabs', require('./scenarios/navigation/tabs.vue')]
])
.add('Notice', [
  ['Loading', require('./scenarios/notice/loading.vue')],
  ['Notification', require('./scenarios/notice/notification.vue')]
])
.add('Others', [
  ['Drop', require('./scenarios/others/drop/default.vue')],
  ['Modal', require('./scenarios/others/modal.vue')],
  ['Offcanvas', require('./scenarios/others/offcanvas.vue')],
  ['Tooltip', require('./scenarios/others/tooltip.vue')],
  ['Upload', require('./scenarios/others/upload.vue')]
])
.run()
