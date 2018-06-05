import { docEl } from 'vuikit/src/_core/utils/env'
import { addClass, removeClass } from 'vuikit/src/_core/utils/class'

export default {
  methods: {
    setPage () {
      addClass(docEl, 'uk-modal-page')
    },
    resetPage () {
      removeClass(docEl, 'uk-modal-page')
    }
  }
}
