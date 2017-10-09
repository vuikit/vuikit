import IconSpinner from '~/icons/spinner' // eslint-disable-line

export default {
  functional: true,
  props: ['ratio'],
  render (h, { props }) {
    return <div class="uk-icon uk-spinner">
      <IconSpinner ratio={ props.ratio }></IconSpinner>
    </div>
  }
}
