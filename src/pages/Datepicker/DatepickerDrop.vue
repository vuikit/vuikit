<template>
  <div class="uk-block">
    <h2>Datepicker in a Dropdown example</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <div class="uk-form">
      <input id="target"
        type="text"
        placeholder="Pick a date"
        v-model="date"
        @focus="show = true">
      <vk-dropdown
        target="#target"
        :show="show"
        @clickOut="show = false">
        <vk-datepicker class="uk-margin-remove"
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
          ">
        </vk-datepicker>
      </vk-dropdown>
    </div>
    <!-- DESC -->
    <div class="uk-margin-large">
      This example illustrate how to combine <code>vk-dropdown</code> with
      <code>vk-datepicker</code>.
    </div>
    <vk-docs-code>{{ code }}</vk-docs-code>
  </div>
</template>

<script>
import mixin from '../_mixin'

export default {
  name: 'Block',
  mixins: [mixin],
  data: () => ({
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
<vk-dropdown
  target="#target"
  :show="show"
  @clickOut="show = false">
  <vk-datepicker class="uk-margin-remove"
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
    ">
  </vk-datepicker>
</vk-dropdown>`
</script>
