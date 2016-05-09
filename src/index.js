import Button from './components/Button'
import ButtonLink from './components/ButtonLink'
import Modal from './components/Modal'
import Pagination from './components/Pagination'

export const components = {
  Pagination,
  Modal
}

export default {
  install (Vue) {
    Vue.component('VkButton', Button)
    Vue.component('VkButtonLink', ButtonLink)
    Vue.component('VkModal', Modal)
    Vue.component('VkPagination', Pagination)
  }
}
