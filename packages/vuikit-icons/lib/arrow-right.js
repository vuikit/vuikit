'use strict';

var arrowRight = {
  functional: true,
  render: function (h, ref) {
    var props = ref.props;
    var width = props.width || 20;
    var height = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-arrow-right',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<polyline fill="none" stroke="#000" points="10 5 15 9.5 10 14" /><line fill="none" stroke="#000" x1="4" y1="9.5" x2="15" y2="9.5" />'
      }
    })
  }
}

module.exports = arrowRight;
