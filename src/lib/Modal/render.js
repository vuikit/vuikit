export default function (h) {
  return (
    <transition name="vk-modal" {...{
      on: {
        'before-enter': this.beforeEnter,
        'after-enter': this.afterEnter,
        'before-leave': this.beforeLeave,
        'after-leave': this.afterLeave
      }
    }}>
      <div class="uk-modal"
        style="display: block;"
        aria-hidden={ this.isOpen
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
