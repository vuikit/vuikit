<template>
  <div class="uk-padding">

    <vk-grid class="uk-child-width-1-2 uk-child-width-1-4@m">
      <div>
        <h3>Icon</h3>
        <vk-icon icon="home" />
        <vk-icon icon="home" ratio="2" />
        <vk-icon icon="home" width="16" height="16" />
        <vk-icon icon="home" viewBox="6 6 16 16" />
      </div>

      <div>
        <h3>IconLink</h3>
        <vk-icon-link href="#" icon="home" />
        <vk-icon-link href="#" icon="home" reset />
      </div>

      <div>
        <h3>IconButton</h3>
        <vk-icon-button icon="home" />
      </div>

      <div>
        <h3>IconImage</h3>
        <vk-icon-image src="/avatar.jpg" />
      </div>
    </vk-grid>

  </div>
</template>
