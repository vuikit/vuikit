<template>
  <div class="uk-padding">

    <vk-pagination
      align="left"
      :page.sync="page"
      :total="total"
      :perPage="perPage"
    >
      <vk-pagination-first />
      <vk-pagination-prev />
      <vk-pagination-pages />
      <vk-pagination-next />
      <vk-pagination-last />
    </vk-pagination>

    <vk-pagination
      :page.sync="page"
      :total="total"
      :perPage="perPage"
    >
      <vk-pagination-first />
      <vk-pagination-prev />
      <vk-pagination-pages />
      <vk-pagination-next />
      <vk-pagination-last />
    </vk-pagination>
    <vk-pagination
      align="right"
      :page.sync="page"
      :total="total"
      :perPage="perPage"
    >
      <vk-pagination-first />
      <vk-pagination-prev />
      <vk-pagination-pages />
      <vk-pagination-next />
      <vk-pagination-last />
    </vk-pagination>

    <h2>Layout</h2>
    <vk-pagination
      :page.sync="page"
      :total="total"
      :perPage="perPage"
    >
      <vk-pagination-first />
      <vk-pagination-prev />
      <vk-pagination-next />
      <vk-pagination-last />
    </vk-pagination>
    <vk-pagination
      :page.sync="page"
      :total="total"
      :perPage="perPage"
    >
      <vk-pagination-pages />
    </vk-pagination>
    <vk-pagination
      :page.sync="page"
      :total="total"
      :perPage="perPage"
    >
      <vk-pagination-prev />
      <vk-pagination-pages />
      <vk-pagination-next />
    </vk-pagination>
    <vk-pagination
      :page.sync="page"
      :total="total"
      :perPage="perPage"
    >
      <vk-pagination-prev label="Previous" expand />
      <vk-pagination-next label="Next" expand />
    </vk-pagination>
    <vk-pagination
      :page.sync="page"
      :total="total"
      :perPage="perPage"
    >
      <vk-pagination-first label="First" expand />
      <vk-pagination-last label="Last" expand />
    </vk-pagination>

  </div>
</template>

<script>
import {
  Pagination as VkPagination,
  PaginationPrev as VkPaginationPrev,
  PaginationNext as VkPaginationNext,
  PaginationFirst as VkPaginationFirst,
  PaginationLast as VkPaginationLast,
  PaginationPages as VkPaginationPages
} from '../'

export default {
  components: {
    VkPagination,
    VkPaginationPrev,
    VkPaginationNext,
    VkPaginationFirst,
    VkPaginationLast,
    VkPaginationPages
  },
  data: () => ({
    total: 200,
    page: 7,
    perPage: 10
  })
}
</script>
