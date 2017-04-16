<template>
  <div class="uk-container uk-margin-bottom">
    <app-header></app-header>
    <h1>{{ $route.name }}</h1>
    <vk-pagination :page="page" :total="total" :perPage="perPage" align="left"
      @change="p => { page = p }">
      <vk-pagination-first />
      <vk-pagination-prev />
      <vk-pagination-pages />
      <vk-pagination-next />
      <vk-pagination-last />
    </vk-pagination>
    <vk-pagination :page="page" :total="total" :perPage="perPage"
      @change="p => { page = p }">
      <vk-pagination-first />
      <vk-pagination-prev />
      <vk-pagination-pages />
      <vk-pagination-next />
      <vk-pagination-last />
    </vk-pagination>
    <vk-pagination :page="page" :total="total" :perPage="perPage" align="right"
      @change="p => { page = p }">
      <vk-pagination-first />
      <vk-pagination-prev />
      <vk-pagination-pages />
      <vk-pagination-next />
      <vk-pagination-last />
    </vk-pagination>

    <h2>Layout</h2>
    <vk-pagination :page="page" :total="0" :perPage="perPage"
      @change="p => { page = p }">
      <vk-pagination-first />
      <vk-pagination-prev />
      <vk-pagination-pages />
      <vk-pagination-next />
      <vk-pagination-last />
    </vk-pagination>
    <vk-pagination :page="page" :total="total" :perPage="perPage"
      @change="p => { page = p }">
      <vk-pagination-pages />
    </vk-pagination>
    <vk-pagination :page="page" :total="total" :perPage="perPage"
      @change="p => { page = p }">
      <vk-pagination-prev />
      <vk-pagination-pages />
      <vk-pagination-next />
    </vk-pagination>
    <vk-pagination :page="page" :total="total" :perPage="perPage"
      @change="p => { page = p }">
      <vk-pagination-prev label="Previous" expand />
      <vk-pagination-next label="Next" expand />
    </vk-pagination>
    <vk-pagination :page="page" :total="total" :perPage="perPage"
      @change="p => { page = p }">
      <vk-pagination-first label="First" expand />
      <vk-pagination-last label="Last" expand />
    </vk-pagination>
  </div>
</template>

<script>
export default {
  data: () => ({
    total: 200,
    page: 7,
    perPage: 10
  })
}
</script>
