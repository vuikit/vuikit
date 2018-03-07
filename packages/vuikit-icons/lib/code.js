'use strict';

var code = {
  functional: true,
  render: function (h, ref) {
    var props = ref.props;
    var width = props.width || 20;
    var height = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-code',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<polyline fill="none" stroke="#000" stroke-width="1.01" points="13,4 19,10 13,16" /><polyline fill="none" stroke="#000" stroke-width="1.01" points="7,4 1,10 7,16" />'
      }
    })
  }
}

module.exports = code;
