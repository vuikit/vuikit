'use strict';

var tv = {
  functional: true,
  render: function (h, ref) {
    var props = ref.props;
    var width = props.width || 20;
    var height = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-tv',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<rect x="7" y="16" width="6" height="1" /><rect fill="none" stroke="#000" x="0.5" y="3.5" width="19" height="11" />'
      }
    })
  }
}

module.exports = tv;
