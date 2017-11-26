import mergeData from '@vuikit/core/helpers/fn-data-merge';
import { warn } from '@vuikit/core/helpers/debug';
import isObject from '@vuikit/core/utils/is-object';
import isInteger from '@vuikit/core/utils/is-integer';
import cloneArray from '@vuikit/core/utils/clone-array';
import isUndefined from '@vuikit/core/utils/is-undefined';

var status = [
  'primary',
  'success',
  'warning',
  'danger'
];

var NotificationMessage = {
  functional: true,
  props: {
    status: {
      type: String,
      default: '',
      validator: function (val) { return !val || status.indexOf(val) !== -1; }
    },
    transition: {
      type: String,
      default: ''
    }
  },
  render: function render (h, ref) {
    var parent = ref.parent;
    var props = ref.props;
    var children = ref.children;
    var data = ref.data;

    var status = props.status;

    var def = {
      class: ['uk-notification-message']
    };

    if (status) {
      def.class.push(("uk-notification-message-" + status));
    }

    return h('div', mergeData(data, def), [
      children
    ])
  }
};

var timeouts = {};
var defaultTimeout = 4500;

var positions = [
  'bottom-left',
  'bottom-center',
  'bottom-right',

  'top-left',
  'top-center',
  'top-right'
];

var notification = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[ 'uk-notification', ("uk-notification-" + (this.position)) ]},_vm._l((_vm.normalizedNfcs),function(n){return _c('notification-message',{key:n.key || n.message,attrs:{"status":n.status,"timeout":n.timeout},on:{"click":function($event){_vm.remove(n);},"mouseenter":function($event){_vm.cancelTimeout(n);},"mouseleave":function($event){_vm.initTimeout(n);}}},[_vm._t("default",[_vm._v(" "+_vm._s(n.message)+" ")],{message:n.message})],2)}))},staticRenderFns: [],
  name: 'Notification',
  components: {
    NotificationMessage: NotificationMessage
  },
  props: {
    notifications: {
      type: Array,
      default: function () { return []; }
      // validator: val => {
      //   const ntfs = val.filter(isObject)
      // }
    },
    position: {
      type: String,
      default: 'top-center',
      validator: function (pos) { return positions.indexOf(pos) !== -1; }
    }
  },
  computed: {
    normalizedNfcs: function normalizedNfcs () {
      var this$1 = this;

      return this.notifications.map(function (n) {
        if (!isObject(n)) {
          warn('The Notification value must be an Object');
          return
        }

        this$1.initTimeout(n);

        return n
      })
    }
  },
  methods: {
    remove: function remove (n) {
      var index = this.notifications.indexOf(n);

      if (index !== -1) {
        var notifications = cloneArray(this.notifications);
        notifications.splice(index, 1);

        this.$emit('update:notifications', notifications);
      }
    },
    initTimeout: function initTimeout (n) {
      var this$1 = this;

      var timeout = n.timeout || defaultTimeout;

      if (!isInteger(timeout)) {
        warn('Notification timeout is invalid');
      }

      var id = getId(n);
      var timeoutIsSet = !isUndefined(timeouts[id]);
      var timeoutShouldBeSet = timeout > 0;

      if (timeoutShouldBeSet && !timeoutIsSet) {
        var timeoutId = setTimeout(function () {
          this$1.remove(n);
          delete timeouts[id];
        }, timeout);

        timeouts[id] = timeoutId;
      }
    },
    cancelTimeout: function cancelTimeout (n) {
      var id = getId(n);
      var timeoutIsSet = !isUndefined(timeouts[id]);

      if (timeoutIsSet) {
        clearTimeout(timeouts[id]);
        delete timeouts[id];
      }
    }
  },
  mounted: function mounted () {
    document.body.appendChild(this.$el);
  },
  beforeDestroy: function beforeDestroy () {
    if (this.$el.parentNode) {
      document.body.removeChild(this.$el);
    }
  }
};

function getId (n) {
  var msg = n.message.replace(/ /g, '');
  var key = n.key || 'key';
  var timeout = n.timeout || 0;

  return (msg + "-" + key + "-" + timeout)
}

export { notification as Notification };
