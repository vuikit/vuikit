'use strict';

var triangleRight = {
  functional: true,
  render: function (h, ref) {
    var props = ref.props;
    var width = props.width || 20;
    var height = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-triangle-right',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<polygon points="8 5 13 10 8 15" />'
      }
    })
  }
}

module.exports = triangleRight;
