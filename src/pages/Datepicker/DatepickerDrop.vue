<template>
  <div class="uk-block">
    <h2>DatepickerDrop</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <div class="uk-form">
      <input id="target"
        type="text"
        placeholder="Pick a date"
        v-model="date"
        @focus="show = true">
      <vk-datepicker-drop
        :show="show"
        target="#target"
        :year="year"
        :month="month"
        :dates="date
          ? [date]
          : []"
        @pick="
          date = arguments[0].format('YYYY-MM-DD'),
          show = false
        "
        @change="
          year = arguments[0].year(),
          month = arguments[0].month()
        "
        @clickOut="show = false">
      </vk-datepicker-drop>
    </div>
    <!-- DESC -->
    <div class="uk-margin-large">
      The component <code>vk-datepicker-drop</code> combines <code>vk-dropdown</code>
      with <code>vk-datepicker</code> allowing easier implementations with inputs and
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
  name: 'Block',
  mixins: [mixin],
  data: () => ({
    tabsIndex: 0,
    show: false,
    date: '',
    year: undefined,
    month: undefined,
    example
  })
}

const example =
`<input id="target"
  type="text"
  placeholder="Pick a date"
  v-model="date"
  @focus="show = true">
<vk-datepicker-drop
  :show="show"
  target="#target"
  :year="year"
  :month="month"
  :dates="date
    ? [date]
    : []"
  @pick="
    date = arguments[0].format('YYYY-MM-DD'),
    show = false
  "
  @change="
    year = arguments[0].year(),
    month = arguments[0].month()
  "
  @clickOut="show = false">
</vk-datepicker-drop>`
</script>
