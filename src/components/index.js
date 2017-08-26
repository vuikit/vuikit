import Breadcrumb from './breadcrumb/breadcrumb'
import BreadcrumbItem from './breadcrumb/breadcrumb-item'
import Button from './button/button'
import ButtonCheckbox from './button/button-checkbox'
import ButtonRadio from './button/button-radio'
import Datepicker from './datepicker/datepicker'
import Drop from './drop/drop'
import Dropdown from './dropdown/dropdown'
import Icon from './icon/icon'
import IconLink from './icon/icon-link'
import IconButton from './icon/icon-button'
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
import OffcanvasContent from './offcanvas/offcanvas-content'
import OffcanvasClose from './offcanvas/offcanvas-close'
import Pagination from './pagination/pagination'
import PaginationFirst from './pagination/pagination-first'
import PaginationLast from './pagination/pagination-last'
import PaginationPrev from './pagination/pagination-prev'
import PaginationNext from './pagination/pagination-next'
import PaginationPages from './pagination/pagination-pages'
import Spinner from './spinner/spinner'
import Sticky from './sticky/sticky'
import Subnav from './subnav/subnav'
import SubnavItem from './subnav/subnav-item'
import Table from './table/table'
import TableColumn from './table/table-column'
import TableColumnSelect from './table/table-column-select'
import TableColumnSort from './table/table-column-sort'
import TableSetup from './table/table-setup'
import Tab from './tabs/tabs-tab'
import Tabs from './tabs/tabs'
import TabsVertical from './tabs/tabs-vertical'
import Tooltip from './tooltip/tooltip'
import Upload from './upload/upload'

export {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonCheckbox,
  ButtonRadio,
  Datepicker,
  Drop,
  Dropdown,
  Icon,
  IconLink,
  IconButton,
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
  OffcanvasContent,
  OffcanvasClose,
  Pagination,
  PaginationFirst,
  PaginationLast,
  PaginationPrev,
  PaginationNext,
  PaginationPages,
  Spinner,
  Sticky,
  Subnav,
  SubnavItem,
  Table,
  TableColumn,
  TableColumnSelect,
  TableColumnSort,
  TableSetup,
  Tab,
  Tabs,
  TabsVertical,
  Tooltip,
  Upload
}

export default {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonCheckbox,
  ButtonRadio,
  Datepicker,
  Drop,
  Dropdown,
  Icon,
  IconLink,
  IconButton,
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
  OffcanvasContent,
  OffcanvasClose,
  Pagination,
  PaginationFirst,
  PaginationLast,
  PaginationPrev,
  PaginationNext,
  PaginationPages,
  Spinner,
  Sticky,
  Subnav,
  SubnavItem,
  Table,
  TableColumn,
  TableColumnSelect,
  TableColumnSort,
  TableSetup,
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
      Vue.component(`Vk${keys[i]}`, this[keys[i]])
    }
  }
}
