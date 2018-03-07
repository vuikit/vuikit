'use strict';

var more = {
  functional: true,
  render: function (h, ref) {
    var props = ref.props;
    var width = props.width || 20;
    var height = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-more',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<circle cx="3" cy="10" r="2" /><circle cx="10" cy="10" r="2" /><circle cx="17" cy="10" r="2" />'
      }
    })
  }
}

module.exports = more;
