<template>
  <div>
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
