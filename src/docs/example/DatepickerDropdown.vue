<template>
  <layouts-default>
    <h1>Datepicker in a Dropdown</h1>
    This example illustrate how to combine <code>vk-dropdown</code> with
    <code>vk-datepicker</code>.
    <hr class="uk-article-divider">
    <div class="uk-margin">
      <!-- DEMO -->
      <span class="uk-form">
        <input
          type="text"
          placeholder="Pick a date"
          v-model="pickedDate"
          @focus="show = true">
        <vk-dropdown expand
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
      </span>
    </div>
    <vk-docs-code>{{ code }}</vk-docs-code>
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
`<span class="uk-form">
  <input
    type="text"
    placeholder="Pick a date"
    v-model="pickedDate"
    @focus="show = true">
  <vk-dropdown expand
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
</span>`
</script>
