'use strict';

var close = {
  functional: true,
  render: function (h, ref) {
    var props = ref.props;
    var width = props.width || 20;
    var height = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-close',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4" /><path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16" />'
      }
    })
  }
}

module.exports = close;
