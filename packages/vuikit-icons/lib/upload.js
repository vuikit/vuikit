'use strict';

var upload = {
  functional: true,
  render: function (h, ref) {
    var props = ref.props;
    var width = props.width || 20;
    var height = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-upload',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<polyline fill="none" stroke="#000" points="5 8 9.5 3.5 14 8 " /><rect x="3" y="17" width="13" height="1" /><line fill="none" stroke="#000" x1="9.5" y1="15" x2="9.5" y2="4" />'
      }
    })
  }
}

module.exports = upload;
