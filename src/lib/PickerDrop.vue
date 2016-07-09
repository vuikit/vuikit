<script>
import Vue from 'vue'
import Picker from './Picker'
const Dropdown = Vue.extend(require('./Dropdown'))

// workaround for required props notice
// that arise when using manual instanciation
Dropdown.options.props.target.required = false

export default {
  extends: Picker,
  created () {
    // init Dropdown
    this.$dropdown = new Dropdown({
      el: document.createElement('div'),
      propsData: this.dropdown
    })
    .$appendTo(document.body)
  },
  ready () {
    // append picker to dropdown
    this.$appendTo(this.$dropdown.$el)
    // close dropdown after each pick
    this.$on('pick', () => {
      this.$dropdown.close()
    })
  },
  props: {
    dropdown: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
