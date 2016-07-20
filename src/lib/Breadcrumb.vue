<template>
  <ul class="uk-breadcrumb">
    <li v-for="(crumb, path) in crumbs"
      :class="{
        'uk-active': path === location
      }">
      <span v-if="crumb.disabled || (path === location)"
        v-text="crumb.name">
      </span>
      <a v-else
        href=""
        v-text="crumb.name"
        @click.prevent="$emit('change', path)">
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'VkBreadcrumb',
  props: {
    crumbs: {
      type: Object
    },
    location: {
      type: String,
      default: '/'
    }
  }
}
</script>
