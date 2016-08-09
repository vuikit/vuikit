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
          ? renderButton.call(this, h, 'angle-double-left', 1)
          : renderButton.call(this, h, 'angle-double-left')
        }
        { this.prevPage
          ? renderButton.call(this, h, 'angle-left', this.prevPage)
          : renderButton.call(this, h, 'angle-left')
        }
      </li>
      { this.prePages.map(page => renderPage.call(this, h, page)) }
      { (this.mainPages[0] > (this.prePages.length + 1)) &&
        (<li><span>...</span></li>) }
      { this.mainPages.map(page => renderPage.call(this, h, page)) }
      { ((this.mainPages[this.mainPages.length - 1] + 1) < this.postPages[0]) &&
        (<li><span>...</span></li>) }
      { this.postPages.map(page => renderPage.call(this, h, page)) }
      <li class={{
        'uk-disabled': !this.nextPage,
        'uk-pagination-next': !this.compact
      }}>
        { this.nextPage
          ? renderButton.call(this, h, 'angle-right', this.nextPage)
          : renderButton.call(this, h, 'angle-right')
        }
        { this.nextPage
          ? renderButton.call(this, h, 'angle-double-right', this.totalPages)
          : renderButton.call(this, h, 'angle-double-right')
        }
      </li>
    </ul>
  )
}

function renderPage (h, page) {
  const isCurrent = page === this.current
  const setAsCurrent = e => {
    e.preventDefault()
    this.change({ current: page })
  }
  return (
    <li class={{
      'uk-active': page === this.current
    }}>{
      isCurrent
        ? (<span>{ page }</span>)
        : (<a on-click={ setAsCurrent }>{ page }</a>)
    }</li>
  )
}

function renderButton (h, icon, page) {
  icon = (<i class={ `uk-icon-${icon}` }></i>)
  const setPage = e => {
    e.preventDefault()
    this.change({ current: page })
  }
  return page
    ? (<a on-click={ setPage }>{ icon }</a>)
    : (<span>{ icon }</span>)
}
