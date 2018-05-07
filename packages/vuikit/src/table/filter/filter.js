import { ElTableFilter, ElTableFilterInput, ElTableFilterIcon } from '../elements'

export default {
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  data: vm => ({
    value: vm.query
  }),
  render (h) {
    const { value } = this

    return h(ElTableFilter, {
      class: 'vk-table-filter'
    }, [
      h(ElTableFilterIcon, {
        props: {
          active: Boolean(this.value)
        },
        on: {
          click: () => {
            this.value = ''
            this.$emit('update:query', '')
          }
        }
      }),
      h(ElTableFilterInput, {
        props: { value },
        on: {
          input: e => {
            this.value = e.target.value
            this.$emit('update:query', e.target.value)
          }
        }
      })
    ])
  }
}
