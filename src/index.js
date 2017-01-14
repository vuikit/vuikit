import Breadcrumb from './Breadcrumb/Breadcrumb'
import BreadcrumbItem from './Breadcrumb/Item'
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
import Subnav from './Subnav/Subnav'
import SubnavItem from './Subnav/Item'
import Table from './Table'
import TableColumn from './Table/columns/Default'
import TableColumnSelect from './Table/columns/Select'
import TableColumnSort from './Table/columns/Sort'
import Tab from './Tabs/Tab'
import Tabs from './Tabs/Tabs'
import TabsVertical from './Tabs/TabsVertical'
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
  Table,
  TableColumn,
  TableColumnSelect,
  TableColumnSort,
  Tab,
  Tabs,
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
