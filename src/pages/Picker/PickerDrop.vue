<template>
  <div class="uk-block">
    <h2>Picker in a Dropdown example</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <div class="uk-form">
      <input id="target"
        placeholder="Pick"
        v-model="picked"
        @focus="show = true">
      <vk-dropdown
        target="#target"
        :show="show"
        @clickOut="show = false">
        <vk-picker class="uk-margin-remove"
          :fields="[{
            name: 'name',
            pickable: 'id'
          }, {
            name: 'hits',
            pickable: true
          }, {
            name: 'description'
          }]"
          :rows="[{
            id: 1,
            name: 'Item 1',
            hits: 34,
            description: 'The item description'
          }, {
            id: 2,
            name: 'Item 2',
            hits: 56,
            description: 'The item description'
          }]"
          @pick="
            picked = arguments[0],
            show = false
          ">
        </vk-picker>
      </vk-dropdown>
    </div>
    <!-- DESC -->
    <div class="uk-margin-large">
      This example illustrate how to combine <code>vk-picker</code> with
      <code>vk-datepicker</code>.
    </div>
    <vk-docs-code>{{ code }}</vk-docs-code>
  </div>
</template>

<script>
import mixin from '../_mixin'

export default {
  mixins: [mixin],
  data: () => ({
    show: false,
    picked: '',
    example
  })
}

const example =
`<input id="target"
  placeholder="Pick"
  v-model="picked"
  @focus="show = true">
<vk-dropdown
  target="#target"
  :show="show"
  @clickOut="show = false">
  <vk-picker class="uk-margin-remove"
    :fields="[{
      name: 'name',
      pickable: 'id'
    }, {
      name: 'hits',
      pickable: true
    }, {
      name: 'description'
    }]"
    :rows="[{
      id: 1,
      name: 'Item 1',
      hits: 34,
      description: 'The item description'
    }, {
      id: 2,
      name: 'Item 2',
      hits: 56,
      description: 'The item description'
    }]"
    @pick="
      picked = arguments[0],
      show = false
    ">
  </vk-picker>
</vk-dropdown>`
</script>
