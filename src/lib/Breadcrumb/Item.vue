<template>
  <li :class="{
    'uk-active': active
  }">
    <a v-if="!disabled && !active" @click.prevent="$parent.$emit('change', path)">
      <slot>
        {{ label }}
      </slot>
    </a>
    <span v-else>
      <slot>
        {{ label }}
      </slot>
    </span>
  </li>
</template>

<script>
export default {
  name: 'VkBreadcrumbItem',
  props: {
    label: String,
    path: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
