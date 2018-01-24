<template>
  <div class="uk-padding">

    <div>
      <skeleton-text :width="150" />
    </div>
    <div>
      <skeleton-text :width="350" />
    </div>

    <div>
      <skeleton-text animated />
    </div>

    <h2>Title</h2>
    <skeleton-title />

    <h2>Title & Subtitle (text)</h2>
    <skeleton-title />
    <skeleton-text />

    <h2>Text</h2>
    <p>
      <skeleton-text />
    </p>

    <h2>Multiline Text</h2>
    <p>
      <skeleton-text v-for="n in 4" :key="n" />
    </p>

    <h2>Image</h2>
    <skeleton-image />

  </div>
</template>

<script>
import * as components from '../'

export default {
  components
}
</script>
