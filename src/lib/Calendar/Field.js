export default {
  functional: true,
  props: ['date'],
  render (h, { parent, props, data }) {
    // each field could provide its own render
    if (parent.dateRender) {
      return h({
        functional: true,
        props: ['date'],
        render: parent.dateRender
      }, {
        props: {
          date: props.date
        }
      })
    } else {
      return <a class={{
        'uk-datepicker-table-muted': props.date.month() !== parent.month
      }}>
        { props.date.format('D') }
      </a>
    }
  }
}
