export default story => ({
  render (h) {
    return <div class="uk-padding">
      { h(story()) }
    </div>
  }
})
