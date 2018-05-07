<template>
  <div class="uk-padding">

    <vk-table-pagination
      align="center"
      :total="total"
      :page.sync="page"
      :perPage.sync="perPage"
    ></vk-table-pagination>

  </div>
</template>

<script>
export default {
  data: () => ({
    page: 1,
    perPage: 5,
    total: 200
  })
}
</script>
