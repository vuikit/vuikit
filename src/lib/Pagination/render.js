import Page from './Page'
import Button from './Button'

export default function (h) {
  return (
    <ul class={{
      'uk-pagination': true,
      'uk-pagination-left': this.align === 'left',
      'uk-pagination-right': this.align === 'right'
    }}>
      <li class={{
        'uk-disabled': !this.prevPage,
        'uk-pagination-previous': !this.compact
      }}>
        { this.prevPage
          ? h(Button, {props: { icon: 'angle-double-left', page: 1 }})
          : h(Button, {props: { icon: 'angle-double-left' }})
        }
        { this.prevPage
          ? h(Button, {props: { icon: 'angle-left', page: this.prevPage }})
          : h(Button, {props: { icon: 'angle-left' }})
        }
      </li>
      { this.prePages.map(page => h(Page, { props: {page} })) }
      { (this.mainPages[0] > (this.prePages.length + 1)) &&
        (<li><span>...</span></li>) }
      { this.mainPages.map(page => h(Page, { props: {page} })) }
      { ((this.mainPages[this.mainPages.length - 1] + 1) < this.postPages[0]) &&
        (<li><span>...</span></li>) }
      { this.postPages.map(page => h(Page, { props: {page} })) }
      <li class={{
        'uk-disabled': !this.nextPage,
        'uk-pagination-next': !this.compact
      }}>
        { this.nextPage
          ? h(Button, {props: { icon: 'angle-right', page: this.nextPage }})
          : h(Button, {props: { icon: 'angle-right' }})
        }
        { this.nextPage
          ? h(Button, {props: { icon: 'angle-double-right', page: this.totalPages }})
          : h(Button, {props: { icon: 'angle-double-right' }})
        }
      </li>
    </ul>
  )
}
