<template>
  <div class="uk-padding">

    <vk-pagination
      :page.sync="page"
      :total="200"
      :perPage="10"
    >
      <vk-pagination-page-first slot="prev"/>
      <vk-pagination-page-prev slot="prev"/>
      <vk-pagination-page-next slot="next"/>
      <vk-pagination-page-last slot="next"/>
    </vk-pagination>

    <vk-pagination
      aligned="center"
      :page.sync="page"
      :total="200"
      :perPage="10"
    >
      <vk-pagination-page-first slot="prev"/>
      <vk-pagination-page-prev slot="prev"/>
      <vk-pagination-page-next slot="next"/>
      <vk-pagination-page-last slot="next"/>
    </vk-pagination>

    <vk-pagination
      aligned="right"
      :page.sync="page"
      :total="200"
      :perPage="10"
    >
      <vk-pagination-page-first slot="prev"/>
      <vk-pagination-page-prev slot="prev"/>
      <vk-pagination-pages/>
      <vk-pagination-page-next slot="next"/>
      <vk-pagination-page-last slot="next"/>
    </vk-pagination>

    <h2>Layout</h2>
    <vk-pagination
      aligned="center"
      :page.sync="page"
      :total="200"
      :perPage="10"
    >
      <vk-pagination-page-first slot="prev"/>
      <vk-pagination-page-prev slot="prev"/>
      <vk-pagination-page-next slot="next"/>
      <vk-pagination-page-last slot="next"/>
    </vk-pagination>

    <vk-pagination
      aligned="center"
      :page.sync="page"
      :total="200"
      :perPage="10"
    />

    <vk-pagination
      aligned="center"
      :page.sync="page"
      :total="200"
      :perPage="10"
    >
      <vk-pagination-page-prev slot="prev"/>
      <vk-pagination-page-next slot="next"/>
    </vk-pagination>

    <vk-pagination
      :page.sync="page"
      :total="200"
      :perPage="10"
    >
      <vk-pagination-page-prev slot="prev" text="Previous" expanded/>
      <vk-pagination-page-next slot="next" text="Next" expanded/>
    </vk-pagination>

    <vk-pagination
      hidePages
      aligned="center"
      :page.sync="page"
      :total="200"
      :perPage="10"
    >
      <vk-pagination-page-first slot="prev" text="First" expanded/>
      <vk-pagination-page-last slot="next" text="Last" expanded/>
    </vk-pagination>

  </div>
</template>

<script>
export default {
  data: () => ({
    page: 7
  })
}
</script>
