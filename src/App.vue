<template>
  <div class="uk-container uk-container-center uk-margin-large-top uk-margin-large-bottom">
    <div class="uk-grid" data-uk-grid-margin>
      <div class="tm-sidebar uk-width-medium-1-4">
        <ul class="uk-list">
          <li v-for="doc in docs">
            <a href="" v-if="current !== doc"
              @click.prevent="current = doc"
              v-text="doc">
            </a>
            <span v-else v-text="doc"></span>
          </li>
        </ul>
      </div>
      <div class="uk-width-medium-3-4">
        <article class="uk-article">
          <h1 class="uk-article-title">
            {{ current }}
          </h1>
          <hr class="uk-article-divider">
          <component :is="current"></component>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
const docs = {
  'Button': require('./docs/Button'),
  'Modal': require('./docs/Modal'),
  'Pagination': require('./docs/Pagination')
}

export default {
  components: docs,
  data: () => ({
    docs: Object.keys(docs),
    current: Object.keys(docs)[0]
  })
}
</script>

<style lang="less">
  @import './uikit/uikit.less';
</style>
