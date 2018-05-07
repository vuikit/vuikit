<template>
  <div class="uk-padding">

    <vk-table-filter
      :query.sync="query"
    ></vk-table-filter>

  </div>
</template>

<script>
export default {
  data: () => ({
    query: ''
  })
}
</script>
