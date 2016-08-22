<template>
  <div class="uk-block">
    <h2>Picker in a Dropdown</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <div class="uk-form">
      <input id="target"
        placeholder="Pick"
        v-model="picked"
        @focus="dropdownShow = true">
      <vk-dropdown
        target="#target"
        :show="dropdownShow"
        @clickOut="dropdownShow = false">
        <vk-picker
          :pickables="[{ name: 'id' }, 'hits']"
          @pick="
            picked = arguments[0],
            dropdownShow = false
          ">
          <vk-table
            track-by="id"
            :fields="['name', 'hits', 'description']"
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
            }]">
          </vk-table>
        </vk-picker>
      </vk-dropdown>
    </div>
    <!-- DESC -->
    <div class="uk-margin-large">
      <p>A very common usage of <code>vk-pikcer</code> is to pick and save the
      date in an input form. That can be acomplished with the combination of
      <code>vk-dropdown</code>.</p>
      <p><span class="uk-badge uk-badge-notification">Note</span> If your project
      requires this combination quite often it would be wise to wrap it all up into
      a custom component.</p>
    </div>
    <!-- TABS -->
    <tm-tabs>
      <tm-tabs-item name="Code">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </tm-tabs-item>
    </tm-tabs>
  </div>
</template>

<script>
import mixin from '../_mixin'

export default {
  mixins: [mixin],
  data: () => ({
    picked: '',
    dropdownShow: false,
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
  <vk-picker
    :pickables="[{ name: 'id' }, 'hits']"
    @pick="
      picked = arguments[0],
      show = false
    ">
    <vk-table
      :fields="['name', 'hits', 'description']"
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
      }]">
    </vk-table>
  </vk-picker>
</vk-dropdown>`
</script>
