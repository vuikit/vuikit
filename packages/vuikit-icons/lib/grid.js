'use strict';

var grid = {
  functional: true,
  render: function (h, ref) {
    var props = ref.props;
    var width = props.width || 20;
    var height = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-grid',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<rect x="2" y="2" width="3" height="3" /><rect x="8" y="2" width="3" height="3" /><rect x="14" y="2" width="3" height="3" /><rect x="2" y="8" width="3" height="3" /><rect x="8" y="8" width="3" height="3" /><rect x="14" y="8" width="3" height="3" /><rect x="2" y="14" width="3" height="3" /><rect x="8" y="14" width="3" height="3" /><rect x="14" y="14" width="3" height="3" />'
      }
    })
  }
}

module.exports = grid;
