<template functional>
  <li class="uk-parent">
    <a :href="props.href" :target="props.target">
      {{ props.title }}
    </a>
    <ul class="uk-nav-sub">
      <slot/>
    </ul>
  </li>
</template>

<script>
export default {
  functional: true,
  name: 'VkNavItemParent',
  props: {
    href: String,
    target: String,
    title: {
      type: String,
      required: true
    }
  }
}
</script>
