'use strict';

var menu = {
  functional: true,
  render: function (h, ref) {
    var props = ref.props;
    var width = props.width || 20;
    var height = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-menu',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<rect x="2" y="4" width="16" height="1" /><rect x="2" y="9" width="16" height="1" /><rect x="2" y="14" width="16" height="1" />'
      }
    })
  }
}

module.exports = menu;
