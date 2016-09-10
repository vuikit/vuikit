<template>
  <div class="uk-block">
    <h2>PickerDrop</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <div class="uk-form">
      <input id="target"
        placeholder="Pick"
        v-model="picked"
        @focus="show = true">
      <vk-picker-drop
        target="#target"
        :show="show"
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
        "
        @clickOut="show = false">
      </vk-picker-drop>
    </div>
    <!-- DESC -->
    <div class="uk-margin-large">
      The component <code>vk-picker-drop</code> combines <code>vk-dropdown</code>
      with <code>vk-picker</code> allowing easier implementations with inputs and
      other elements.
    </div>
    <!-- TABS -->
    <vk-tabs
      :index="tabsIndex"
      @change="tabsIndex = arguments[0]">
      <vk-tabs-item name="Code">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tabs-item>
    </vk-tabs>
  </div>
</template>

<script>
import mixin from '../_mixin'

export default {
  mixins: [mixin],
  data: () => ({
    tabsIndex: 0,
    show: false,
    picked: '',
    example
  })
}

const example =
`<input id="target"
  placeholder="Pick"
  v-model="picked"
  @focus="show = true" />
<vk-picker-drop
  target="#target"
  :show="show"
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
  "
  @clickOut="show = false">
</vk-picker-drop>`
</script>
