let active
let activeCount

function setAsActive (modal) {
  active = modal
  activeCount++
}

function setAsInactive (modal) {
  activeCount--

  if (active === modal) {
    active = null
  }
}

export { setAsActive, setAsInactive, active, activeCount }
