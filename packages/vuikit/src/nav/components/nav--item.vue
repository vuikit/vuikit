<template functional>
  <li
    :class="[data.staticClass, { 'uk-active': props.active }]"
    v-on="listeners"
  >
    <a
      :href="props.href"
      :target="props.target"
      v-on="listeners"
    >
      <template v-if="props.icon">
        <vk-icon :icon="props.icon"/>
        <span v-if="props.title"
          class="uk-text-middle uk-margin-small-left"
          v-text="props.title"
        />
      </template>
      <template v-else>
        {{ props.title }}
      </template>
    </a>
  </li>
</template>

<script>
export default {
  functional: true,
  props: {
    href: String,
    title: String,
    target: String,
    active: Boolean,
    icon: [String, Object]
  }
}
</script>
