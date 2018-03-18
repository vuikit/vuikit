<template>
  <div class="uk-padding">

    <div>
      <vk-skeleton-text :width="150" />
    </div>
    <div>
      <vk-skeleton-text :width="350" />
    </div>

    <div>
      <vk-skeleton-text animated />
    </div>

    <h2>Title</h2>
    <vk-skeleton-title />

    <h2>Title & Subtitle (text)</h2>
    <vk-skeleton-title />
    <vk-skeleton-text />

    <h2>Text</h2>
    <p>
      <vk-skeleton-text />
    </p>

    <h2>Multiline Text</h2>
    <p>
      <vk-skeleton-text v-for="n in 4" :key="n" />
    </p>

    <h2>Image</h2>
    <vk-skeleton-image />

  </div>
</template>
