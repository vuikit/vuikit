<script>
import UI from 'uikit'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    keyboard: {
      type: Boolean,
      default: true
    },
    center: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    options: function () {
      return {
        keyboard: this.keyboard,
        center: this.center,
        bgclose: this.bgClose
      }
    }
  },
  watch: {
    show: function (state) {
      if (state) {
        this.UImodal.show()
      } else if (this.UImodal.isActive()) {
        this.UImodal.hide()
      }
    },
    block: function (state) {
      if (state) {
        this.UImodal.options.bgclose = false
        this.UImodal.options.keyboard = false
        this.UImodal.options.modal = false
      } else {
        this.UImodal.options.bgclose = true
        this.UImodal.options.keyboard = true
        this.UImodal.options.modal = true
      }
    },
    center: function (state) {
      this.UImodal.options.center = state
    },
    bgClose: function (state) {
      this.UImodal.options.bgclose = state
    },
    keyboard: function (state) {
      this.UImodal.options.keyboard = state
    }
  },
  ready: function () {
    this.initModal()
  },
  methods: {
    initModal: function () {
      var vm = this
      this.UImodal = UI.modal(this.$els.modal, this.options)
      this.UImodal.on('show.uk.modal', () => {
        vm.show = true
        vm.$emit('show')
        setTimeout(function () {
          // catch .uk-overflow-container
          vm.UImodal.resize()
        }, 1)
      })
      this.UImodal.on('hide.uk.modal', () => {
        vm.show = false
        vm.$emit('hide')
      })
    }
  }
}
</script>
