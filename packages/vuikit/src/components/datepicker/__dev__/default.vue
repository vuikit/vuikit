<template>
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
</template>

<script>
const now = Date.now()

export default {
  data: () => ({
    date: now,
    pickedDates: [now]
  })
}
</script>
