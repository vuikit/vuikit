'use strict';

var creditCard = {
  functional: true,
  render: function (h, ref) {
    var props = ref.props;
    var width = props.width || 20;
    var height = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-credit-card',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<rect fill="none" stroke="#000" x="1.5" y="4.5" width="17" height="12" /><rect x="1" y="7" width="18" height="3" />'
      }
    })
  }
}

module.exports = creditCard;
