import Alert from './Alert'
import Breadcrumb from './Breadcrumb'
import Button from './Button'
import ButtonLink from './ButtonLink'
import ButtonCheckbox from './ButtonCheckbox'
import ButtonRadio from './ButtonRadio'
import Calendar from './Calendar'
import Datepicker from './Datepicker'
import Dropdown from './Dropdown'
import Filter from './Filter'
import Modal from './Modal'
import Pagination from './Pagination'
import Picker from './Picker'
import Progress from './Progress'
import Subnav from './Subnav'
// import Switcher from './Switcher'
// import Switch from './SwitcherItem'
import Table from './Table'
import Tab from './Tabs/Tab'
import Tabs from './Tabs/Default'
// import TabsVertical from './TabsVertical'
import Upload from './Upload'

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
  Filter,
  Modal,
  Pagination,
  Picker,
  Progress,
  Subnav,
  // Switcher,
  // Switch,
  Table,
  Tab,
  Tabs,
  // TabsVertical,
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
