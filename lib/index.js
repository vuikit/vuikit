import Breadcrumb from './breadcrumb/breadcrumb'
import BreadcrumbItem from './breadcrumb/breadcrumb-item'
import Button from './button/button'
import ButtonCheckbox from './button/button-checkbox'
import ButtonRadio from './button/button-radio'
import Datepicker from './datepicker/datepicker'
import Dropdown from './dropdown/dropdown'
import Modal from './modal/modal'
import ModalDialog from './modal/modal-dialog'
import ModalHeader from './modal/modal-header'
import ModalBody from './modal/modal-body'
import ModalFooter from './modal/modal-footer'
import ModalCaption from './modal/modal-caption'
import ModalClose from './modal/modal-close'
import Notification from './notification/notification'
import NotificationMessage from './notification/notification-message'
import Offcanvas from './offcanvas/offcanvas'
import Pagination from './pagination/pagination'
import PaginationFirst from './pagination/pagination-first'
import PaginationLast from './pagination/pagination-last'
import PaginationPrev from './pagination/pagination-prev'
import PaginationNext from './pagination/pagination-next'
import PaginationPages from './pagination/pagination-pages'
import Subnav from './subnav/subnav'
import SubnavItem from './subnav/subnav-item'
import Table from './table/table'
import TableColumn from './table/table-column'
import TableColumnSelect from './table/table-column-select'
import TableColumnSort from './table/table-column-sort'
import Tab from './tabs/tabs-tab'
import Tabs from './tabs/tabs'
import TabsVertical from './tabs/tabs-vertical'
import Tooltip from './tooltip/tooltip'
import Upload from './upload/upload'

const Vuikit = {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonCheckbox,
  ButtonRadio,
  Datepicker,
  Dropdown,
  Modal,
  ModalDialog,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCaption,
  ModalClose,
  Notification,
  NotificationMessage,
  Offcanvas,
  Pagination,
  PaginationFirst,
  PaginationLast,
  PaginationPrev,
  PaginationNext,
  PaginationPages,
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

export default Vuikit
