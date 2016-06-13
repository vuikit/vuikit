<template>
  <nav class="uk-navbar">
    <a href="#tm-offcanvas" class="uk-navbar-toggle uk-visible-small" data-uk-offcanvas></a>
  </nav>
  <div id="tm-offcanvas" class="uk-offcanvas">
    <div class="uk-offcanvas-bar">
      <ul class="uk-nav tm-nav uk-nav-offcanvas">
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
  </div>
  <div class="tm-middle">
    <div class="uk-container uk-container-center">
      <div class="uk-grid" data-uk-grid-margin>
        <div class="tm-sidebar uk-width-medium-1-4 uk-hidden-small">
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
            <span class="uk-hidden-large uk-text-small uk-text-muted">
              Note: Rotate the screen to see the rest of the options.
            </span>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Pages = {
  Alert: require('./pages/Alert/index'),
  Breadcrumb: require('./pages/Breadcrumb/index'),
  Button: require('./pages/Button/index'),
  Calendar: require('./pages/Calendar/index'),
  Datepicker: require('./pages/Datepicker/index'),
  Modal: require('./pages/Modal/index'),
  Pagination: require('./pages/Pagination/index'),
  Progress: require('./pages/Progress/index'),
  Subnav: require('./pages/Subnav/index'),
  Switcher: require('./pages/Switcher/index'),
  Tabs: require('./pages/Tabs/index'),
  Upload: require('./pages/Upload/index')
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
    PageAlert: Pages.Alert,
    PageBreadcrumb: Pages.Breadcrumb,
    PageButton: Pages.Button,
    PageCalendar: Pages.Calendar,
    PageDatepicker: Pages.Datepicker,
    PageModal: Pages.Modal,
    PagePagination: Pages.Pagination,
    PageProgress: Pages.Progress,
    PageSubnav: Pages.Subnav,
    PageSwitcher: Pages.Switcher,
    PageTabs: Pages.Tabs,
    PageUpload: Pages.Upload
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

/*
 * Responsive
 */
@media (min-width: 501px) and (max-width: 959px) {
  .tm-docs-hidden-medium {
    display: none !important;
  }
}
@media (max-width: 500px) {
  .tm-docs-hidden-small {
    display: none !important;
  }
}

</style>
