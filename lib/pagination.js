import isInteger from '@vuikit/core/utils/is-integer';
import isArray from '@vuikit/core/utils/is-array';
import paginationMatrix from '@vuikit/core/helpers/pagination-matrix';

// icon-pagination-next
var IconNext = {
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props;
    var ratio = props.ratio || 1;
    var width = props.width || 7;
    var height = props.height || 12;
    var viewBox = props.viewBox || '0 0 7 12';

    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'icon-pagination-next ratio-' + ratio,
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.2" d="M1 1l5 5-5 5"/>'
      }
    })
  }
};

var PaginationLast = {
  functional: true,
  props: ['label', 'expand'],
  render: function render (h, ref) {
    var props = ref.props;
    var parent = ref.parent;

    var label = props.label;
    var expand = props.expand;

    // if not rendered by VkPagination, return comment to mark the position
    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', { attrs: { label: label, expand: expand } }, 'last')
    }

    return h('li', {
      class: {
        'uk-disabled': parent.nextPage > parent.lastPage,
        'uk-margin-auto-left': expand !== undefined
      }
    }, [
      h('a', {
        on: { click: function (e) { return parent.$emit('update:page', parent.lastPage); } }
      }, [
        label && label,
        h('span', {
          staticClass: 'uk-icon uk-pagination-next',
          class: {
            'uk-margin-small-left': label
          }
        }, [ h(IconNext) ])
      ])
    ])
  }
};

// icon-pagination-previous
var IconPrevious = {
  functional: true,
  render: function (h, ctx) {
    var props = ctx.props;
    var ratio = props.ratio || 1;
    var width = props.width || 7;
    var height = props.height || 12;
    var viewBox = props.viewBox || '0 0 7 12';

    if (ratio !== 1) {
      width = width * ratio;
      height = height * ratio;
    }

    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'icon-pagination-previous ratio-' + ratio,
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<path fill="none" stroke="#000" stroke-width="1.2" d="M6 1L1 6l5 5"/>'
      }
    })
  }
};

var PaginationPrev = {
  functional: true,
  props: ['label', 'expand'],
  render: function render (h, ref) {
    var props = ref.props;
    var parent = ref.parent;

    var label = props.label;
    var expand = props.expand;

    // if not rendered by VkPagination, return comment to mark the position
    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', { attrs: { label: label, expand: expand } }, 'prev')
    }

    return h('li', {
      class: {
        'uk-disabled': parent.prevPage < 1,
        'uk-margin-auto-right': expand !== undefined
      }
    }, [
      h('a', {
        on: { click: function (e) { return parent.$emit('update:page', parent.prevPage); } }
      }, [
        h('span', {
          staticClass: 'uk-icon uk-pagination-prev',
          class: {
            'uk-margin-small-right': label
          }
        }, [ h(IconPrevious) ]),
        label && label
      ])
    ])
  }
};

var PaginationNext = {
  functional: true,
  props: ['label', 'expand'],
  render: function render (h, ref) {
    var props = ref.props;
    var parent = ref.parent;

    var label = props.label;
    var expand = props.expand;

    // if not rendered by VkPagination, return comment to mark the position
    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', { attrs: { label: label, expand: expand } }, 'next')
    }

    return h('li', {
      class: {
        'uk-disabled': parent.nextPage > parent.lastPage,
        'uk-margin-auto-left': expand !== undefined
      }
    }, [
      h('a', {
        on: { click: function (e) { return parent.$emit('update:page', parent.nextPage); } }
      }, [
        label && label,
        h('span', {
          staticClass: 'uk-icon uk-pagination-next',
          class: {
            'uk-margin-small-left': label
          }
        }, [ h(IconNext) ])
      ])
    ])
  }
};

var PaginationFirst = {
  functional: true,
  props: ['label', 'expand'],
  render: function render (h, ref) {
    var props = ref.props;
    var parent = ref.parent;

    var label = props.label;
    var expand = props.expand;

    // if not rendered by VkPagination, return comment to mark the position
    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', { attrs: { label: label, expand: expand } }, 'first')
    }

    return h('li', {
      class: {
        'uk-disabled': parent.prevPage < 1,
        'uk-margin-auto-right': expand !== undefined
      }
    }, [
      h('a', {
        on: { click: function (e) { return parent.$emit('update:page', 1); } }
      }, [
        h('span', {
          staticClass: 'uk-icon uk-pagination-prev',
          class: {
            'uk-margin-small-right': label
          }
        }, [ h(IconPrevious) ]),
        label && label
      ])
    ])
  }
};

var PaginationPages = {
  functional: true,
  render: function render (h, ref) {
    var parent = ref.parent;

    // if not rendered by VkPagination, return comment to mark the position
    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', 'pages')
    }

    var currentPage = parent.page;
    return parent.pages.map(function (page) {
      var isPage = isInteger(page);
      var isActive = isPage && currentPage === page;
      return h('li', { class: { 'uk-active': isActive } }, [
        isPage
          ? isActive
            ? h('span', page)
            : h('a', {
              on: { click: function (e) {
                parent.$emit('update:page', page);
              }}
            }, page)
          : h('span', '...')
      ])
    })
  }
};

var partsMap = {
  first: PaginationFirst,
  last: PaginationLast,
  prev: PaginationPrev,
  next: PaginationNext,
  pages: PaginationPages
};

var pagination = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"uk-pagination",class:{ 'uk-flex-center': _vm.align !== 'left' && _vm.align !== 'right', 'uk-flex-right': _vm.align === 'right' }},[_c('pag-parts')],1)},staticRenderFns: [],
  name: 'Pagination',
  props: {
    align: {
      type: String,
      default: 'center' // left|center|right
    },
    // the active page
    page: {
      type: Number
    },
    // items displayed on each page
    perPage: {
      type: Number
    },
    // amount of visible pages around the active one
    range: {
      type: Number,
      default: 3
    },
    // total amount of items
    total: {
      type: Number
    }
  },
  computed: {
    prevPage: function prevPage () {
      return this.page - 1
    },
    nextPage: function nextPage () {
      return this.page + 1
    },
    pages: function pages () {
      return paginationMatrix({ total: this.total, page: this.page, perPage: this.perPage })
    },
    lastPage: function lastPage () {
      return this.pages[this.pages.length - 1]
    }
  },
  components: {
    'pag-parts': {
      functional: true,
      render: function render (h, ref) {
        var parent = ref.parent;

        var lis = [];
        parent.$parts.forEach(function (part) {
          part = parent.$createElement(part.comp, { props: part.props });

          if (isArray(part)) {
            lis = lis.concat(part);
          } else {
            lis.push(part);
          }
        });

        return lis
      }
    }
  },
  created: function created () {
    this.$parts = this.$slots.default
      .filter(function (slot) { return slot.children; })
      .map(function (slot) { return ({
        comp: partsMap[slot.children[0].text],
        props: (slot.data && slot.data.attrs) || {}
      }); });
  }
};

export { pagination as Pagination, PaginationFirst, PaginationLast, PaginationPrev, PaginationNext, PaginationPages };
