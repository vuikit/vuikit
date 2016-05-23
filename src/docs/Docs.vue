<template>
  <div class="tm-middle">
    <div class="uk-container uk-container-center">
      <div class="uk-grid" data-uk-grid-margin>
        <div class="tm-sidebar uk-width-medium-1-4">
          <ul class="uk-nav tm-nav">
            <li v-for="page in pages"
              :class="{
                'uk-active': current === page
              }">
              <a :href="'#' + page.toLowerCase()"
                @click="current = page"
                v-text="page">
              </a>
            </li>
          </ul>
        </div>
        <div class="uk-width-medium-3-4">
          <article class="uk-article">
            <h1 class="uk-article-title">
              {{ current }}
            </h1>
            <hr class="uk-article-divider">
            <component :is="'Page' + current"></component>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Pages = {
  Button: require('./pages/Button/index'),
  Modal: require('./pages/Modal/index'),
  Pagination: require('./pages/Pagination/index'),
  Tabs: require('./pages/Tabs/index'),
  Badge: require('./pages/Badge/index')
}

export default {
  created () {
    // set inital current page
    const hash = window.location.hash.replace('#', '')
    this.current = hash
      ? `${hash.charAt(0).toUpperCase()}${hash.slice(1)}`
      : Object.keys(Pages)[0]
  },
  components: {
    PageButton: Pages.Button,
    PageModal: Pages.Modal,
    PagePagination: Pages.Pagination,
    PageTabs: Pages.Tabs,
    PageBadge: Pages.Badge
  },
  data: () => ({
    pages: Object.keys(Pages),
    current: ''
  })
}
</script>

<style>
/*
 * Blocks
 */

.tm-middle,
.tm-footer { padding: 50px 0; }

/*
 * Nav
 */
.tm-nav > li > a:hover,
.tm-nav > li > a:focus,
.tm-nav > li.uk-active > a {
    background: #F5F5F5;
    color: #444;
}

/*
 * Sidebar
 */
.tm-sidebar {
  border-right: 1px solid #E5E5E5;
  margin-right: -1px !important;
}

/*
 * Docs pages
 */
.tm-docs-subtitle {
  margin: 60px 0 0 0;
}
</style>
