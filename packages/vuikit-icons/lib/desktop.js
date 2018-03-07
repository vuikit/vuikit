'use strict';

var desktop = {
  functional: true,
  render: function (h, ref) {
    var props = ref.props;
    var width = props.width || 20;
    var height = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-desktop',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<rect x="8" y="15" width="1" height="2" /><rect x="11" y="15" width="1" height="2" /><rect x="5" y="16" width="10" height="1" /><rect fill="none" stroke="#000" x="1.5" y="3.5" width="17" height="11" />'
      }
    })
  }
}

module.exports = desktop;
