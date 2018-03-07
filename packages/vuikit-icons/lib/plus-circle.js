'use strict';

var plusCircle = {
  functional: true,
  render: function (h, ref) {
    var props = ref.props;
    var width = props.width || 20;
    var height = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-plus-circle',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<circle fill="none" stroke="#000" stroke-width="1.1" cx="9.5" cy="9.5" r="9" /><line fill="none" stroke="#000" x1="9.5" y1="5" x2="9.5" y2="14" /><line fill="none" stroke="#000" x1="5" y1="9.5" x2="14" y2="9.5" />'
      }
    })
  }
}

module.exports = plusCircle;
