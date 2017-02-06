<template>
  <div>
    <vk-pagination :active="active" :total="total" :limit="limit" align="left"
      @change="page => {
        active = page
      }">
      <vk-pagination-first />
      <vk-pagination-prev />
      <vk-pagination-pages />
      <vk-pagination-next />
      <vk-pagination-last />
    </vk-pagination>
    <vk-pagination :active="active" :total="total" :limit="limit"
      @change="page => {
        active = page
      }">
      <vk-pagination-first />
      <vk-pagination-prev />
      <vk-pagination-pages />
      <vk-pagination-next />
      <vk-pagination-last />
    </vk-pagination>
    <vk-pagination :active="active" :total="total" :limit="limit" align="right"
      @change="page => {
        active = page
      }">
      <vk-pagination-first />
      <vk-pagination-prev />
      <vk-pagination-pages />
      <vk-pagination-next />
      <vk-pagination-last />
    </vk-pagination>

    <h2>Layout</h2>
    <vk-pagination :active="active" :total="0" :limit="limit"
      @change="page => {
        active = page
      }">
      <vk-pagination-first />
      <vk-pagination-prev />
      <vk-pagination-pages />
      <vk-pagination-next />
      <vk-pagination-last />
    </vk-pagination>
    <vk-pagination :active="active" :total="total" :limit="limit"
      @change="page => {
        active = page
      }">
      <vk-pagination-pages />
    </vk-pagination>
    <vk-pagination :active="active" :total="total" :limit="limit"
      @change="page => {
        active = page
      }">
      <vk-pagination-prev />
      <vk-pagination-pages />
      <vk-pagination-next />
    </vk-pagination>
    <vk-pagination :active="active" :total="total" :limit="limit"
      @change="page => {
        active = page
      }">
      <vk-pagination-prev label="Previous" expand />
      <vk-pagination-next label="Next" expand />
    </vk-pagination>
    <vk-pagination :active="active" :total="total" :limit="limit"
      @change="page => {
        active = page
      }">
      <vk-pagination-first label="First" expand />
      <vk-pagination-last label="Last" expand />
    </vk-pagination>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: 7,
    total: 200,
    limit: 10
  })
}
</script>
