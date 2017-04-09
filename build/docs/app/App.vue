<template>
  <router-view></router-view>
</template>

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
 * Misc
 */
.uk-article .uk-block + .uk-block {
  padding-top: 0;
}

/*
 Highlight - github.com style (c) Vasily Polovnyov <vast@whiteants.net>
*/

.hljs-comment,
.hljs-quote {
  color: #998;
  font-style: italic;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-subst {
  color: #333;
  font-weight: bold;
}

.hljs-number,
.hljs-literal,
.hljs-variable,
.hljs-template-variable,
.hljs-tag .hljs-attr {
  color: #008080;
}

.hljs-string,
.hljs-doctag {
  color: #d14;
}

.hljs-title,
.hljs-section,
.hljs-selector-id {
  color: #900;
  font-weight: bold;
}

.hljs-subst {
  font-weight: normal;
}

.hljs-type,
.hljs-class .hljs-title {
  color: #458;
  font-weight: bold;
}

.hljs-tag,
.hljs-name,
.hljs-attribute {
  color: #000080;
  font-weight: normal;
}

.hljs-regexp,
.hljs-link {
  color: #009926;
}

.hljs-symbol,
.hljs-bullet {
  color: #990073;
}

.hljs-built_in,
.hljs-builtin-name {
  color: #0086b3;
}

.hljs-meta {
  color: #999;
  font-weight: bold;
}

.hljs-deletion {
  background: #fdd;
}

.hljs-addition {
  background: #dfd;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}
</style>
