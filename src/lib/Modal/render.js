export default function (h) {
  const directives = [{
    name: 'show', value: this.show
  }]
  return (
    <transition name={ this.transition } {...{
      on: {
        'before-enter': this.beforeEnter,
        'after-enter': this.afterEnter,
        'after-leave': this.afterLeave
      }
    }}>
      <div {...{ directives }} class="uk-modal"
        aria-hidden={ this.show
          ? 'false'
          : 'true'
        }>
        <div ref="dialog" class={{
          'uk-modal-dialog': true,
          'uk-modal-dialog-large': this.large,
          'uk-modal-dialog-lightbox': this.lightbox,
          'uk-modal-dialog-blank': this.blank
        }}>
          { this.$slots.default }
        </div>
      </div>
    </transition>
  )
}
