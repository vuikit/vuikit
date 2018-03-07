'use strict';

var expand = {
  functional: true,
  render: function (h, ref) {
    var props = ref.props;
    var width = props.width || 20;
    var height = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-expand',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<polygon points="13 2 18 2 18 7 17 7 17 3 13 3" /><polygon points="2 13 3 13 3 17 7 17 7 18 2 18" /><path fill="none" stroke="#000" stroke-width="1.1" d="M11,9 L17,3" /><path fill="none" stroke="#000" stroke-width="1.1" d="M3,17 L9,11" />'
      }
    })
  }
}

module.exports = expand;
