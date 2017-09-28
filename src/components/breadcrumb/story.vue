<template>
  <div class="uk-padding">
    <vk-breadcrumb
      :location="location"
      @change="loc => { location = loc }"
    >
      <vk-breadcrumb-item label="Home" path="/" />
      <vk-breadcrumb-item label="Blog" path="/blog" />
      <vk-breadcrumb-item label="Category" path="/blog/category" />
      <vk-breadcrumb-item label="Post" path="/blog/category/post" disabled />
    </vk-breadcrumb>
  </div>
</template>

<script>
export default {
  data: () => ({
    location: '/'
  })
}
</script>
