export default {
  functional: true,
  props: {
    vkBlank: Boolean,
    vkState: {
      type: String,
      validator: val => !val || /^(success|danger)$/.test(val)
    },
    vkSize: {
      type: String,
      validator: val => !val || /^(large|small)$/.test(val)
    },
    vkWidth: {
      type: String,
      validator: val => !val || /^(large|medium|small|xsmall)$/.test(val)
    }
  }
}
