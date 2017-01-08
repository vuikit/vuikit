<template>
  <layouts-default>
    <div class="uk-block">
      <h2>Datepicker in a Dropdown</h2>
      <hr class="uk-article-divider">
      <!-- DEMO -->
      <div class="uk-form">
        <input ref="input"
          type="text"
          placeholder="Pick a date"
          v-model="pickedDate"
          @focus="show = true">
        <vk-dropdown expand
          :target="$refs.input"
          :show="show"
          @clickOut="
            show = false,
            date = pickedDate
          ">
          <vk-datepicker class="uk-margin-remove"
            :date="date || Date.now()"
            :pickedDates="pickedDate
              ? [pickedDate]
              : []
            "
            @pick="({ date, format }) => {
              pickedDate = format(date, 'YYYY-MM-DD')
              show = false
            }"
            @change="({ date }) => { $data.date = date }">
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
  </layouts-default>
</template>

<script>
import mixin from '../_mixin'

export default {
  name: 'Block',
  mixins: [mixin],
  data: () => ({
    show: false,
    date: '',
    pickedDate: '',
    example
  })
}

const example =
`<input ref="input"
  type="text"
  placeholder="Pick a date"
  v-model="date"
  @focus="show = true">
<vk-dropdown expand
  :target="$refs.input"
  :show="show"
  @clickOut="show = false">
  <vk-datepicker class="uk-margin-remove"
    :date="date || Date.now()"
    :pickedDates="date
      ? [date]
      : []
    "
    @pick="({ date, format }) => {
      $data.date = format(date, 'YYYY-MM-DD')
      show = false
    }"
    @change="({ date }) => { $data.date = date }">
  </vk-datepicker>
</vk-dropdown>`
</script>
