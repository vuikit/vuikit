<template>
  <div class="uk-padding">

    <h2>v-model</h2>
    <vk-input v-model="value"/>

    <h2>value/input</h2>
    <vk-input :value="value" @input="val => value = val"/>

    <h2>modifiers</h2>
    <vk-input placeholder="danger" vk-state="danger"/>

    <h2>HTML Types</h2>
    <vk-input type="number" v-model="value"/>

    <h2>icon</h2>
    <div class="uk-margin">
      <div class="uk-inline">
        <vk-form-icon icon="user"/>
        <vk-input/>
      </div>
    </div>

    <div class="uk-margin">
      <div class="uk-inline">
        <vk-form-icon flipped icon="user"/>
        <vk-input/>
      </div>
    </div>

    <div class="uk-margin">
      <div class="uk-inline">
        <vk-form-icon-link icon="link"/>
        <vk-input/>
      </div>
    </div>

    <div class="uk-margin">
      <div class="uk-inline">
        <vk-form-icon-link flipped icon="link"/>
        <vk-input/>
      </div>
    </div>

  </div>
</template>

<script>
import VkIconsUser from '@vuikit/icons/user'
import VkIconsLink from '@vuikit/icons/link'

export default {
  components: {
    VkIconsUser,
    VkIconsLink
  },
  data: () => ({
    value: 'value'
  })
}
</script>
