<template>
  <div class="uk-padding">

    <subnav>
      <subnav-item title="Active" active />
      <subnav-item title="Item" />
      <subnav-item title="Item" />
      <subnav-item title="Disabled" disabled />
    </subnav>

    <hr />

    <subnav divided>
      <subnav-item title="Active" active />
      <subnav-item title="Item" />
      <subnav-item title="Item" />
      <subnav-item title="Disabled" disabled />
    </subnav>

    <hr />

    <subnav pilled>
      <subnav-item title="Active" active />
      <subnav-item title="Item" />
      <subnav-item title="Item" />
      <subnav-item title="Disabled" disabled />
    </subnav>

    <hr />

    <subnav divided pilled>
      <subnav-item title="Active" active />
      <subnav-item title="Item" />
      <subnav-item title="Item" />
      <subnav-item title="Disabled" disabled />
    </subnav>

  </div>
</template>

<script>
import Subnav from '../ui/subnav'
import SubnavItem from '../ui/subnav-item'

export default {
  components: {
    Subnav,
    SubnavItem
  }
}
</script>
