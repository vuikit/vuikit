<template>
  <li :class="{
    'uk-active': $parent.value === value
  }">
    <a @click.prevent="$parent.$emit('input', value)">
      {{ label }}
    </a>
  </li>
</template>

<script>
export default {
  name: 'PropTogglerOption',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      required: true
    }
  }
}
</script>
