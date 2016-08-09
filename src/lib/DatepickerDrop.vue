<script>
import Vue from 'vue'
import DatepickerDef from './Datepicker'
import DropdownDef from './Dropdown'
import { mapKeys, merge, upperFirst, lowerFirst, pick } from 'lodash'

const Dropdown = Vue.extend(merge({}, DropdownDef))
const DropdownProps = mapKeys(
  // prefixed with dropdown
  DropdownDef.props, (value, key) => 'dropdown' + upperFirst(key)
)

// workaround for required props notice
// that arise when using manual instanciation
Dropdown.options.props.target.required = false

export default {
  name: 'VkDatepickerDrop',
  extends: DatepickerDef,
  created () {
    // get all dropdown props
    const dropProps = pick(this, Object.keys(DropdownProps))
    // init Dropdown
    this.$dropdown = new Dropdown({
      el: document.createElement('div'),
      propsData: mapKeys(dropProps, (value, key) =>
        // remove the prefix
        lowerFirst(key.replace('dropdown', ''))
      )
    })
    .$appendTo(document.body)
  },
  ready () {
    // append datepicker to dropdown
    this.$appendTo(this.$dropdown.$el)
  },
  props: merge({}, DropdownProps)
}
</script>
