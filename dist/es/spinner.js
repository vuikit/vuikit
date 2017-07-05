var Svg = {
  functional: true,
  render: function render (h, ref) {
    var props = ref.props;

    var meta = props.meta;
    var data = props.data;
    var viewBox = props.viewBox;
    var width = props.width;
    var height = props.height;

    return h('svg', {
      attrs: {
        meta: meta,
        width: width,
        height: height,
        version: '1.1',
        viewBox: viewBox || ("0 0 " + width + " " + height)
      },
      domProps: {
        innerHTML: data
      }
    })
  }
};

var spinner$1 = {
  name: 'spinner',
  data: '<circle fill="none" stroke="#000" cx="15" cy="15" r="14"/>',
  viewBox: '0 0 30 30',
  width: 30,
  height: 30
};

var spinner = {
  name: 'VkSpinner',
  functional: true,
  props: {
    ratio: {
      default: 1
    }
  },
  render: function render (h, ref) {
    var props = ref.props;

    var ratio = props.ratio;

    // dimensions
    var width = spinner$1.width;
    var height = spinner$1.height;

    // ratio
    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h('div', {
      staticClass: 'uk-spinner uk-icon'
    }, [
      h(Svg, {
        props: Object.assign({}, spinner$1,
          {width: width,
          height: height})
      })
    ])
  }
};

export { spinner as Spinner };
