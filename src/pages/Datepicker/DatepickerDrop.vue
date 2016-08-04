<template>
  <div class="uk-block">
    <h2>Datepicker in a Dropdown</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <div class="uk-form">
      <input id="target"
        type="text"
        placeholder="Pick a date"
        v-model="date"
        @focus="dropdownShow = true">
      <vk-dropdown
        target="#target"
        :show="dropdownShow"
        @clickOut="dropdownShow = false">
        <vk-datepicker
          :dates="[date]"
          @pick="
            date = arguments[0].format('YYYY-MM-DD'),
            dropdownShow = false
          ">
          <vk-calendar
            :year="calendar.year"
            :month="calendar.month"
            @change="
              calendar.year = arguments[0].year(),
              calendar.month = arguments[0].month()
            ">
          </vk-calendar>
        </vk-datepicker>
      </vk-dropdown>
    </div>
    <!-- DESC -->
    <div class="uk-margin-large">
      <p>A very common usage of <code>vk-datepicker</code> is to pick and save the
      date in an input form. That can be acomplished with the combination of
      <code>vk-dropdown</code>.</p>
      <p><span class="uk-badge uk-badge-notification">Note</span> If your project
      requires this combination quite often it would be wise to wrap it all up into
      a custom component.</p>
    </div>
    <!-- TABS -->
    <vk-tabs>
      <vk-tab label="Code">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import mixin from '../_mixin'

export default {
  name: 'Block',
  mixins: [mixin],
  data: () => ({
    date: '',
    calendar: {
      year: undefined,
      month: undefined
    },
    dropdownShow: false,
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
  <vk-datepicker
    :dates="[date]"
    @pick="
      date = arguments[0].format('YYYY-MM-DD'),
      show = false
    ">
    <vk-calendar
      :year="calendar.year"
      :month="calendar.month"
      @change="
        calendar.year = arguments[0].year(),
        calendar.month = arguments[0].month()
      ">
    </vk-calendar>
  </vk-datepicker>
</vk-dropdown>`
</script>
