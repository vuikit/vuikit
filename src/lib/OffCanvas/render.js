import Transition from './Transition'

export default function (h) {
  const directives = [{
    name: 'show', value: this.show
  }]
  const offcanvas = (
    <div {...{ directives }} staticClass="uk-offcanvas"
      aria-hidden={ this.show
        ? 'false'
        : 'true'
      }
      on-click={e => {
        if (e.target !== this.$el && this.$el.contains(e.target)) {
          this.$emit('clickIn', e)
        } else {
          this.$emit('clickOut', e)
        }
      }}>
      <div ref="bar" staticClass="uk-offcanvas-bar" class={{
        'uk-offcanvas-bar-flip': this.flip
      }}>
        { this.$slots.default }
      </div>
    </div>
  )
  return h(Transition, [ offcanvas ])
}
