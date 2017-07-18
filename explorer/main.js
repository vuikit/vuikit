import Vue from 'vue'
import * as vuikit from 'src/js/vuikit'
import explorer from '@vuikit/explorer'
import '../dist/vuikit.css'

import ButtonScenario from './scenarios/basic/button.vue'
import ButtonCheckboxScenario from './scenarios/basic/button-checkbox.vue'
import ButtonRadioScenario from './scenarios/basic/button-radio.vue'
import IconScenario from './scenarios/basic/icon.vue'
import SpinnerScenario from './scenarios/basic/spinner.vue'
import TableScenario from './scenarios/data/table/index.vue'
import DropdownScenario from './scenarios/navigation/dropdown/default.vue'
import BreadcrumbScenario from './scenarios/navigation/breadcrumb.vue'
import PaginationScenario from './scenarios/navigation/pagination.vue'
import SubnavScenario from './scenarios/navigation/subnav.vue'
import TabsScenario from './scenarios/navigation/tabs.vue'
import NotificationScenario from './scenarios/notice/notification.vue'
import DropScenario from './scenarios/others/drop/default.vue'
import ModalScenario from './scenarios/others/modal.vue'
import OffcanvasScenario from './scenarios/others/offcanvas.vue'
import TooltipScenario from './scenarios/others/tooltip.vue'
import UploadScenario from './scenarios/others/upload.vue'
import StickyScenario from './scenarios/others/sticky.vue'

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
    ['Button', ButtonScenario],
    ['Button Checkbox', ButtonCheckboxScenario],
    ['Button Radio', ButtonRadioScenario],
    ['Icon', IconScenario],
    ['Spinner', SpinnerScenario]
  ])
  .add('Data', [
    ['Table', TableScenario]
  ])
  .add('Navigation', [
    ['Dropdown', DropdownScenario],
    ['Breadcrumb', BreadcrumbScenario],
    ['Pagination', PaginationScenario],
    ['Subnav', SubnavScenario],
    ['Tabs', TabsScenario]
  ])
  .add('Notice', [
    ['Notification', NotificationScenario]
  ])
  .add('Others', [
    ['Drop', DropScenario],
    ['Modal', ModalScenario],
    ['Offcanvas', OffcanvasScenario],
    ['Tooltip', TooltipScenario],
    ['Upload', UploadScenario],
    ['Sticky', StickyScenario]
  ])
  .run()
