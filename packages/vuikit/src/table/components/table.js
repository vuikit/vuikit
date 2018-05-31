import { assign } from 'vuikit/src/_core/utils/lang'
import { ROW_CLICK_PREVENTED } from '../constants'

import Core from '../core'
import TableRender from '../render'
import MixinSelect from '../mixins/select'

import { ElTableTr } from '../elements'

export default {
  name: 'VkTable',
  extends: Core,
  mixins: [ MixinSelect ],
  props: {
    divided: {
      default: true
    },
    sortedBy: {
      type: Object
    }
  },
  render (h) {
    const instance = this

    return h(TableRender, {
      attrs: this.$attrs,
      props: assign({}, this.$props, {
        columns: this.columns,
        row (h, { data, children }) {
          return h(ElTableTr, {
            props: {
              active: instance.isRowSelected(data.row)
            },
            class: instance.resolveRowClass(data.row),
            on: {
              click: e => {
                const isPrevented = e[ROW_CLICK_PREVENTED]
                const isIgnoredTag = /^(A|BUTTON)$/.test(e.target.tagName)

                if (isPrevented || isIgnoredTag) {
                  return
                }

                instance.toggleRowSelection(data.row)
              }
            }
          }, children)
        }
      })
    })
  }
}
