import Button from './vue/Button'
import ButtonLink from './vue/ButtonLink'
import Modal from './vue/Modal'
import Pagination from './vue/Pagination'

export const components = {
  Button,
  ButtonLink,
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
