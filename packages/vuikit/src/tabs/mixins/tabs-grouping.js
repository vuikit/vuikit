import { width } from '@vuikit/core/utils/dimensions'
import { findAll } from '@vuikit/core/utils/selector'
import { debounce } from '@vuikit/core/utils/misc'

export default {
  props: {
    group: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    groupCount: false
  }),
  methods: {
    calculateTabGrouping () {
      let group

      const TabsContainerWidth = width(this.$el)
      const TabsWidths = findAll('li', this.$el).map(el => width(el))

      TabsWidths.reduce((r, width, index) => {
        const total = r + width

        if (total < TabsContainerWidth) {
          group = index
        }

        return total
      }, 0)

      // rest always one so the dropdown tab can fit
      if (group) {
        this.groupCount = group - 1
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.calculateTabGrouping()
    })
    this.on(window, 'resize', debounce(() =>
      this.$nextTick(this.calculateTabGrouping), 20, true)
    )
  }
}
