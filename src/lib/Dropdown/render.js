export default function (h) {
  return (
    <transition name="vk-dropdown" {...{
      on: {
        'before-enter': this.beforeEnter,
        'after-leave': this.afterLeave
      }
    }}>
      <div class={{
        'uk-dropdown': !this.blank,
        'uk-dropdown-blank': this.blank,
        'uk-dropdown-small': !this.fixWidth,
        'uk-dropdown-scrollable': this.scrollable
      }}
      style="display: block;"
      aria-hidden={ this.isOpen
        ? 'false'
        : 'true'
      }>
        { this.$slots.default }
      </div>
    </transition>
  )
}
