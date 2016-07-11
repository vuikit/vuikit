<script>
import Vue from 'vue'
import Datepicker from './Datepicker'
const Dropdown = Vue.extend(require('./Dropdown'))

// workaround for required props notice
// that arise when using manual instanciation
Dropdown.options.props.target.required = false

export default {
  extends: Datepicker,
  created () {
    // init Dropdown
    this.$dropdown = new Dropdown({
      el: document.createElement('div'),
      propsData: this.dropdown
    })
    .$appendTo(document.body)
  },
  ready () {
    // append datepicker to dropdown
    this.$appendTo(this.$dropdown.$el)
  },
  props: {
    dropdown: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
