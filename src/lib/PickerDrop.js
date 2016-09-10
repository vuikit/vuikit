import Picker from './Picker'

export default {
  name: 'VkPickerDrop',
  render: function (h) {
    return (
      <vk-dropdown
        target={ this.target }
        show={ this.show }
        on-clickOut={e => this.$emit('clickOut')}>
        {
          h(Picker, {
            class: 'uk-margin-remove',
            props: {
              fields: this.fields,
              rows: this.rows
            },
            on: {
              pick: picked => this.$emit('pick', picked)
            }
          })
        }
      </vk-dropdown>
    )
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    target: {
      type: String,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    }
  }
}
