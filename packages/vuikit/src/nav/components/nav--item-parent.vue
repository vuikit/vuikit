<template functional>
  <li
    :class="['uk-parent', data.staticClass]"
    v-on="listeners"
  >
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
