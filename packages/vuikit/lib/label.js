import { includes } from '@vuikit/core/util';
import mergeData from '@vuikit/core/helpers/vue-data-merge';

var obj;
var label = {
  functional: true,
  props: {
    type: {
      type: String,
      default: '',
      validator: function (val) { return !val || includes(['success', 'warning', 'danger'], val); }
    }
  },
  render: function (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;
      return h('span', mergeData(data, {
      class: ['uk-label', ( obj = {}, obj[("uk-label-" + (props.type))] = props.type, obj)]
    }), children);
}
}

export { label as Label };
