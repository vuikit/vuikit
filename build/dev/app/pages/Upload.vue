<template>
  <div class="uk-container uk-margin-bottom">
    <app-header></app-header>
    <h1>{{ $route.name }}</h1>
    <vk-upload
      @dropped="events.dropped.emited = true"
      @selected="events.selected.emited = true">
      <span uk-icon="icon: cloud-upload"></span>
      <span class="uk-text-middle">Attach binaries by dropping them here or</span>
      <div uk-form-custom>
        <input type="file" multiple>
        <span class="uk-link">selecting one</span>
      </div>
    </vk-upload>
  </div>
</template>

<script>
export default {
  name: 'PageUpload',
  data: () => ({
  })
}
</script>
