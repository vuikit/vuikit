<template>
  <div class="uk-padding">

    <h1>Icon</h1>

    <vk-grid class="uk-child-width-1-2">
      <div>
        <h3>icon</h3>
        <vk-icon icon="check" />
        <vk-icon icon="check" ratio="3.5" />
        <vk-icon icon="file" width="10" height="10" />
        <vk-icon icon="home" viewBox="6 6 16 16" />
      </div>

      <div>
        <h3>icon-link</h3>
        <vk-icon-link href="#" icon="check" />
        <vk-icon-link icon="check" ratio="3.5" />
        <vk-icon-link icon="file" width="10" height="10" />
        <vk-icon-link icon="home" viewBox="6 6 16 16" />
        <vk-icon-link href="#" icon="home" reset />
      </div>

      <div>
        <h3>icon-button</h3>
        <vk-icon-button icon="check" />
        <vk-icon-button icon="check" ratio="3.5" />
        <vk-icon-button icon="file" width="10" height="10" />
        <vk-icon-button icon="home" viewBox="6 6 16 16" />
      </div>

      <div>
        <h3>icon-image</h3>
        <vk-icon-image src="/avatar.jpg" />
      </div>
    </vk-grid>

  </div>
</template>
