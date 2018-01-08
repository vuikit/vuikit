import UiBreadcrumb from './ui/breadcrumb'

export default {
  functional: true,
  render (h, { data, children }) {
    return h(UiBreadcrumb, data, children)
  }
}
