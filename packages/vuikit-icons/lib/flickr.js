'use strict';

var flickr = {
  functional: true,
  render: function (h, ref) {
    var props = ref.props;
    var width = props.width || 20;
    var height = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-flickr',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<circle cx="5.5" cy="9.5" r="3.5" /><circle cx="14.5" cy="9.5" r="3.5" />'
      }
    })
  }
}

module.exports = flickr;
