import Datepicker from './Datepicker'

export default {
  name: 'VkDatepickerDrop',
  extends: Datepicker,
  render: function (h) {
    return (
      <vk-dropdown
        target={ this.target }
        show={ this.show }
        on-clickOut={e => this.$emit('clickOut')}>
        {
          h(Datepicker, {
            class: 'uk-margin-remove',
            props: {
              year: this.year,
              month: this.month,
              dates: this.dates,
              disabledDates: this.disabledDates,
              min: this.min,
              max: this.max
            },
            on: {
              pick: picked => this.$emit('pick', picked),
              unpick: unpicked => this.$emit('unpick', unpicked),
              change: date => this.$emit('change', date)
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
    }
  }
}
