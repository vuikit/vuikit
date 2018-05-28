export let active
export let activeCount

export default {
  methods: {
    setAsActive () {
      active = this
      activeCount++
    },
    setAsInactive () {
      activeCount--

      if (active === this) {
        active = null
      }
    },
    isActive () {
      return this === active
    }
  }
}
