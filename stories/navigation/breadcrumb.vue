<template>
  <vk-breadcrumb
    :location="demo.location"
    @change="location => {
      demo.location = location
    }">
    <vk-breadcrumb-item label="Home" path="/" />
    <vk-breadcrumb-item label="Blog" path="/blog" />
    <vk-breadcrumb-item label="Category" path="/blog/category" />
    <vk-breadcrumb-item label="Post" path="/blog/category/post" disabled />
  </vk-breadcrumb>
</template>

<script>
export default {
  data: () => ({
    demo: {
      location: '/'
    }
  })
}
</script>
