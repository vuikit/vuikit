import Breadcrumb from './Breadcrumb'
import BreadcrumbItem from './BreadcrumbItem'
import Button from './Button'
import ButtonCheckbox from './ButtonCheckbox'
import ButtonRadio from './ButtonRadio'
import Datepicker from './Datepicker'
import Notify from './Notify'
import NotifyMessage from './NotifyMessage'
import Dropdown from './Dropdown'
import Modal from './Modal'
import Offcanvas from './Offcanvas'
import Pagination from './Pagination'
import Subnav from './Subnav'
import SubnavItem from './SubnavItem'
import Switcher from './Switcher'
import SwitcherItem from './SwitcherItem'
import Table from './Table'
import TableColumn from './Table/columns/Default'
import TableColumnSelect from './Table/columns/Select'
import TableColumnSort from './Table/columns/Sort'
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
  Datepicker,
  Notify,
  NotifyMessage,
  Dropdown,
  Modal,
  Offcanvas,
  Pagination,
  Subnav,
  SubnavItem,
  Switcher,
  SwitcherItem,
  Table,
  TableColumn,
  TableColumnSelect,
  TableColumnSort,
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
      if (this[keys[i]].bind) {
        Vue.directive(`Vk${keys[i]}`, this[keys[i]])
      } else {
        Vue.component(`Vk${keys[i]}`, this[keys[i]])
      }
    }
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuikit)
}

module.exports = Vuikit
