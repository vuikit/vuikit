<template>
  <div class="uk-padding">

    <subnav v-model="active">
      <subnav-item title="Item" name="first" />
      <subnav-item title="Item" name="second" />
      <subnav-item title="Item" name="third" />
      <subnav-item title="Disabled" name="fourth" disabled />
    </subnav>

    Active: {{ active }}

    <hr />

    <p>Using index if name omited</p>
    <subnav v-model="active">
      <subnav-item title="Item" />
      <subnav-item title="Item" />
      <subnav-item title="Item" />
      <subnav-item title="Disabled" disabled />
    </subnav>

    <hr />

    Modifiers supported

    <subnav pilled v-model="active">
      <subnav-item title="Active" active />
      <subnav-item title="Item" />
      <subnav-item title="Item" />
      <subnav-item title="Disabled" disabled />
    </subnav>

  </div>
</template>

<script>
import * as components from '../'

export default {
  components,
  data: () => ({
    active: 'first'
  })
}
</script>
