import Alert from './Alert'
import Breadcrumb from './Breadcrumb'
import Button from './Button'
import ButtonLink from './ButtonLink'
import ButtonCheckbox from './ButtonCheckbox'
import ButtonRadio from './ButtonRadio'
import Calendar from './Calendar'
import Datepicker from './Datepicker'
import Dropdown from './Dropdown'
// import Filter from './Filter'
// import Modal from './Modal'
// import ModalLightbox from './ModalLightbox'
// import ModalBlank from './ModalBlank'
// import ModalAlert from './ModalAlert'
// import ModalConfirm from './ModalConfirm'
// import Pagination from './Pagination'
// import Picker from './Picker'
// import PickerDrop from './PickerDrop'
// import Progress from './Progress'
// import Subnav from './Subnav'
// import SubnavItem from './SubnavItem'
// import Switcher from './Switcher'
// import Switch from './SwitcherItem'
// import Table from './Table'
import Tab from './Tabs/Tab'
import Tabs from './Tabs/Default'
// import TabsVertical from './TabsVertical'
// import Upload from './Upload'

const Vuikit = {
  Alert,
  Breadcrumb,
  Button,
  ButtonLink,
  ButtonCheckbox,
  ButtonRadio,
  Calendar,
  Datepicker,
  Dropdown,
  // Filter,
  // Modal,
  // ModalLightbox,
  // ModalBlank,
  // ModalAlert,
  // ModalConfirm,
  // Pagination,
  // Picker,
  // PickerDrop,
  // Progress,
  // Subnav,
  // SubnavItem,
  // Switcher,
  // Switch,
  // Table,
  Tab,
  Tabs,
  // TabsVertical,
  // Upload,
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
