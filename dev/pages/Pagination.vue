<template>
  <div>
    <vk-pagination
      @change="page => {
        active = page
      }">
      <vk-pagination-first />
      <vk-pagination-prev />
      <vk-pagination-pages :active="active" :total="total" :limit="limit" />
      <vk-pagination-next />
      <vk-pagination-last />
    </vk-pagination>
    <vk-pagination
      alignment="center"
      @change="page => {
        active = page
      }">
      <vk-pagination-first />
      <vk-pagination-prev />
      <vk-pagination-pages :active="active" :total="total" :limit="limit" />
      <vk-pagination-next />
      <vk-pagination-last />
    </vk-pagination>
    <vk-pagination
      alignment="right"
      @change="page => {
        active = page
      }">
      <vk-pagination-first />
      <vk-pagination-prev />
      <vk-pagination-pages :active="active" :total="total" :limit="limit" />
      <vk-pagination-next />
      <vk-pagination-last />
    </vk-pagination>
    <h2>Layout</h2>
    <vk-pagination
      alignment="center"
      @change="page => {
        active = page
      }">
      <vk-pagination-pages :active="active" :total="total" :limit="limit" />
    </vk-pagination>
    <vk-pagination
      alignment="center"
      @change="page => {
        active = page
      }">
      <vk-pagination-prev />
      <vk-pagination-pages :active="active" :total="total" :limit="limit" />
      <vk-pagination-next />
    </vk-pagination>
    <vk-pagination
      alignment="expand"
      :active="active"
      :total="total"
      :limit="limit"
      @change="page => {
        active = page
      }">
      <vk-pagination-prev label="Previous" />
      <vk-pagination-next label="Next" />
    </vk-pagination>
    <vk-pagination
      alignment="expand"
      :active="active"
      :total="total"
      :limit="limit"
      @change="page => {
        active = page
      }">
      <vk-pagination-first label="First" />
      <vk-pagination-last label="Last" />
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
