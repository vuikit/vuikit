<template>
  <div class="uk-padding">

    <breadcrumb
      :location="location"
      @change="loc => { location = loc }"
    >
      <breadcrumb-item label="Home" path="/" />
      <breadcrumb-item label="Blog" path="/blog" />
      <breadcrumb-item label="Category" path="/blog/category" />
      <breadcrumb-item label="Post" path="/blog/category/post" disabled />
    </breadcrumb>

  </div>
</template>

<script>
import { Breadcrumb, BreadcrumbItem } from '../'

export default {
  components: {
    Breadcrumb,
    BreadcrumbItem
  },
  data: () => ({
    location: '/'
  })
}
</script>
