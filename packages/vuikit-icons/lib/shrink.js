'use strict';

var shrink = {
  functional: true,
  render: function (h, ref) {
    var props = ref.props;
    var width = props.width || 20;
    var height = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-shrink',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<polygon points="11 4 12 4 12 8 16 8 16 9 11 9" /><polygon points="4 11 9 11 9 16 8 16 8 12 4 12" /><path fill="none" stroke="#000" stroke-width="1.1" d="M12,8 L18,2" /><path fill="none" stroke="#000" stroke-width="1.1" d="M2,18 L8,12" />'
      }
    })
  }
}

module.exports = shrink;
