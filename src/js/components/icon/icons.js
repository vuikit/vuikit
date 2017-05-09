const icons = {}

export default {
  get (icon) {
    return icons[icon]
  },
  register (icon) {
    if (!this.get(icon.name)) {
      icons[icon.name] = icon
    }
  }
}
