import { debounce } from 'lodash'

export default function (h) {
  const nodes = {}
  if (this.filters) {
    nodes.button = renderButton.call(this, h)
    nodes.dropdown = renderDropdown.call(this, h)
  }
  const data = {
    domProps: {
      value: this.query
    },
    on: {
      input: debounce(e => {
        if (e.target.composing) {
          return
        }
        this.query = e.target.value
      }, 500)
    }
  }
  return (
    <div class="vk-filter uk-form">
      <div class="uk-flex">
        { nodes.button }
        <div class="uk-form-icon uk-flex-item-1">
          {
            this.query && this.showReset
              ? (<i class="uk-icon-remove uk-link"
                  style="pointer-events: auto;"
                  on-click={() => { this.query = '' }}>
                </i>)
              : (<i class="uk-icon-search"></i>)
          }
          <input class="uk-width-1-1"
            type="text"
            {...data} />
        </div>
      </div>
      { nodes.dropdown }
    </div>
  )
}

function renderButton (h) {
  return (
    <button class="uk-button"
      ref="button"
      type="button"
      on-click={() => { this.dropdown.show = true }}>
      Filters <i class="uk-icon-caret-down"></i>
    </button>
  )
}

function renderDropdown (h) {
  return (
    <vk-dropdown
      fixWidth
      ref="dropdown"
      target={ this.dropdown.target }
      show={ this.dropdown.show }
      on-clickOut={() => { this.dropdown.show = false }}>
      <ul class="uk-nav uk-nav-dropdown">{
        this.filters.map(({ name, query }) => (
          <li>
            <a on-click={e => {
              e.preventDefault()
              this.query = query
              this.dropdown.show = false
            }}>
              { name }
            </a>
          </li>
        ))
      }</ul>
    </vk-dropdown>
  )
}
