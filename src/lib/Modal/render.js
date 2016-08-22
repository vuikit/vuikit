import Transition from './Transition'

export default function (h) {
  const directives = [{
    name: 'show', value: this.show
  }]
  const modal = (
    <div {...{ directives }} class="uk-modal"
      aria-hidden={ this.show
        ? 'false'
        : 'true'
      }>
      <div staticClass="uk-modal-dialog" class={{
        'uk-modal-dialog-large': this.large,
        'uk-modal-dialog-lightbox': this.lightbox,
        'uk-modal-dialog-blank': this.blank
      }}>
        { this.$slots.default }
      </div>
    </div>
  )
  return h(Transition, [ modal ])
}
