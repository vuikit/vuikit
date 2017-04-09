<template>
  <div class="uk-container uk-margin-bottom">
    <app-header></app-header>
    <h1>{{ $route.name }}</h1>
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
  </div>
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
