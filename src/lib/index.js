import Breadcrumb from './Breadcrumb'
import BreadcrumbItem from './BreadcrumbItem'
import Button from './Button'
import ButtonCheckbox from './ButtonCheckbox'
import ButtonRadio from './ButtonRadio'
import Calendar from './Calendar'
import Datepicker from './Datepicker'
import Notify from './Notify'
import NotifyMessage from './NotifyMessage'
import Dropdown from './Dropdown'
import Modal from './Modal'
import Offcanvas from './Offcanvas'
import Pagination from './Pagination'
import Picker from './Picker'
import PickerDrop from './PickerDrop'
import Subnav from './Subnav'
import SubnavItem from './SubnavItem'
import Switcher from './Switcher'
import SwitcherItem from './SwitcherItem'
import Table from './Table'
import Tabs from './Tabs'
import TabsItem from './TabsItem'
import TabsVertical from './TabsVertical'
import Tooltip from './Tooltip'
import Upload from './Upload'

const Vuikit = {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonCheckbox,
  ButtonRadio,
  Calendar,
  Datepicker,
  Notify,
  NotifyMessage,
  Dropdown,
  Modal,
  Offcanvas,
  Pagination,
  Picker,
  PickerDrop,
  Subnav,
  SubnavItem,
  Switcher,
  SwitcherItem,
  Table,
  Tabs,
  TabsItem,
  TabsVertical,
  Tooltip,
  Upload,
  install (Vue) {
    const keys = Object.keys(this)
    keys.pop() // remove 'install' from keys
    let i = keys.length
    while (i--) {
      Vue.component(`Vk${keys[i]}`, this[keys[i]])
    }
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuikit)
}

module.exports = Vuikit
