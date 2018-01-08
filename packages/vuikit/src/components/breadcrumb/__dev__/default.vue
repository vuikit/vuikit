<template>
  <div class="uk-padding">

    <breadcrumb>
      <breadcrumb-item title="Item" />
      <breadcrumb-item title="Item" />
      <breadcrumb-item title="Disabled" disabled />
      <breadcrumb-item title="Active" active />
    </breadcrumb>

  </div>
</template>

<script>
import Breadcrumb from '../breadcrumb'
import BreadcrumbItem from '../breadcrumb-item'

export default {
  components: {
    Breadcrumb,
    BreadcrumbItem
  }
}
</script>
