export default function (h) {
  const directives = [{
    name: 'show', value: this.show
  }]
  return (
    <transition name={ this.transition } {...{
      on: {
        'before-enter': () => {
          this.$nextTick(() => this.$tether.enable())
        },
        'after-leave': () => {
          this.$nextTick(() => this.$tether.disable())
        }
      }
    }}>
      <div {...{ directives }} class={{
        'uk-dropdown': !this.blank,
        'uk-dropdown-blank': this.blank,
        'uk-dropdown-small': !this.fixWidth,
        'uk-dropdown-scrollable': this.scrollable
      }}
      aria-hidden={ this.show
        ? 'false'
        : 'true'
      }>
        { this.$slots.default }
      </div>
    </transition>
  )
}
