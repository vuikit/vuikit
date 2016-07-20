<script>
const UI = typeof window !== 'undefined' && window.UIkit
import TabHeader from './TabHeader'

export default {
  name: 'VkTabs',
  components: {
    TabHeader
  },
  props: {
    // align tabs right and in reversed order
    flip: {
      type: Boolean,
      default: false
    },
    // center the tabs
    center: {
      type: Boolean,
      default: false
    },
    // place the tabs at the bottom
    bottom: {
      type: Boolean,
      default: false
    },
    // tabs width using UIkit grid
    width: {
      type: String,
      default: ''
    }
  },
  computed: {
    id: function () {
      return `vk-tabs-${this._uid}`
    }
  },
  render (h) {
    let headers = this.$slots.default.filter(node =>
      node.componentOptions && node.componentOptions.tag === 'vk-tab'
    )
    return (
      <div class={{
        'uk-flex uk-flex-column-reverse': this.bottom
      }}>
        <div class={{
          'uk-tab-center': this.center,
          'uk-tab-center-bottom': this.center && this.bottom
        }}>{
          h('ul', {
            attrs: {
              'data-uk-tab': `{ connect: '#${this.id}' }`
            },
            class: {
              'uk-tab': true,
              'uk-tab-grid': this.width,
              'uk-tab-flip': this.flip,
              'uk-tab-bottom': this.bottom
            }
          }, headers.map(node => {
            const tab = node.componentOptions.propsData
            return h('TabHeader', {
              props: {
                label: tab.label,
                width: this.width,
                active: tab.active,
                disabled: tab.disabled
              }
            })
          }))
        }</div>
        <ul class='uk-switcher uk-margin'
          ref='tabs-body'
          id={this.id}>
          { this.$slots.default }
        </ul>
      </div>
    )
  },
  mounted () {
    // on tab change
    UI.$(this.$el).on('change.uk.tab', () => {
      this.$emit('change')
    })
  }
}
</script>
