import Alert from './Alert'
import Breadcrumb from './Breadcrumb'
import Button from './Button'
import Crumb from './BreadcrumbItem'
import ButtonLink from './ButtonLink'
import ButtonCheckbox from './ButtonCheckbox'
import ButtonRadio from './ButtonRadio'
import Calendar from './Calendar'
import Datepicker from './Datepicker'
import Modal from './Modal'
import ModalLightbox from './ModalLightbox'
import ModalBlank from './ModalBlank'
import ModalAlert from './ModalAlert'
import ModalConfirm from './ModalConfirm'
import Pagination from './Pagination'
import Progress from './Progress'
import Subnav from './Subnav'
import SubnavItem from './SubnavItem'
import Switcher from './Switcher'
import Switch from './SwitcherItem'
import Tab from './Tab'
import Tabs from './Tabs'
import TabsVertical from './TabsVertical'

const vuikit = {
  Alert,
  Breadcrumb,
  Button,
  Crumb,
  ButtonLink,
  ButtonCheckbox,
  ButtonRadio,
  Calendar,
  Datepicker,
  Modal,
  ModalLightbox,
  ModalBlank,
  ModalAlert,
  ModalConfirm,
  Pagination,
  Progress,
  Subnav,
  SubnavItem,
  Switcher,
  Switch,
  Tab,
  Tabs,
  TabsVertical,
  install (Vue) {
    if (this.installed) {
      return
    }
    const keys = Object.keys(this)
    keys.pop() // remove 'install' from keys
    let i = keys.length
    while (i--) {
      Vue.component(`Vk${keys[i]}`, this[keys[i]])
    }
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vuikit)
}

export {
  Alert,
  Breadcrumb,
  Button,
  Crumb,
  ButtonLink,
  ButtonCheckbox,
  ButtonRadio,
  Calendar,
  Datepicker,
  Modal,
  ModalLightbox,
  ModalBlank,
  ModalAlert,
  ModalConfirm,
  Pagination,
  Progress,
  Subnav,
  SubnavItem,
  Switcher,
  Switch,
  Tab,
  Tabs,
  TabsVertical,
  vuikit as default
}
