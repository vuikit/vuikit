var notification = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uk-notification",class:[("uk-notification-" + (_vm.position))]},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'VkNotification',
  props: {
    position: {
      type: String,
      default: 'top-center' // (top|bottom)-(left|center|right)
    }
  },
  mounted: function mounted () {
    // move to body
    document.body.appendChild(this.$el);
  },
  beforeDestroy: function beforeDestroy () {
    if (this.$el.parentNode) {
      document.body.removeChild(this.$el);
    }
  }
};

var notificationMessage = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.transition}},[_c('div',{staticClass:"uk-notification-message",class:( obj = {}, obj[("uk-notification-message-" + (_vm.status))] = _vm.status, obj ),on:{"click":function($event){_vm.$parent.$emit('click', _vm.id);}}},[_vm._t("default")],2)])
var obj;},staticRenderFns: [],
  name: 'VkNotificationMessage',
  props: {
    id: {
      type: [Number, String, Object],
      default: 0
    },
    /* primary|success|warning|danger */
    status: {
      type: String,
      default: ''
    },
    timeout: {
      type: Number,
      default: 5000
    },
    transition: {
      type: String,
      default: ''
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    if (this.timeout > 0) {
      setTimeout(function () {
        this$1.$parent.$emit('timeout', this$1.id);
      }, this.timeout);
    }
  }
};

export { notification as Notification, notificationMessage as NotificationMessage };
