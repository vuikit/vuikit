<template>
  <div class="uk-container uk-margin-bottom">
    <app-header></app-header>
    <h1>{{ $route.name }}</h1>
    <vk-datepicker
      :date="date"
      :pickedDates="pickedDates"
      @pick="({ dates }) => {
        pickedDates = dates
      }"
      @unpick="({ dates }) => {
        pickedDates = dates
      }"
      @change="({ date }) => {
        $data.date = date
      }">
    </vk-datepicker>
  </div>
</template>

<script>
const now = Date.now()

export default {
  name: 'Basic',
  data: () => ({
    date: now,
    pickedDates: [ now ]
  })
}
</script>
