'use strict';

var thumbnails = {
  functional: true,
  render: function (h, ref) {
    var props = ref.props;
    var width = props.width || 20;
    var height = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-thumbnails',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<rect fill="none" stroke="#000" x="3.5" y="3.5" width="5" height="5" /><rect fill="none" stroke="#000" x="11.5" y="3.5" width="5" height="5" /><rect fill="none" stroke="#000" x="11.5" y="11.5" width="5" height="5" /><rect fill="none" stroke="#000" x="3.5" y="11.5" width="5" height="5" />'
      }
    })
  }
}

module.exports = thumbnails;
