<template>
  <div class="uk-padding">

    <h2>Default</h2>

    <vk-card>
      <vk-card-title>Title</vk-card-title>
      Lorem ipsum
    </vk-card>

    <h2>Styles</h2>

    <vk-card type="primary">
      <vk-card-title>Primary</vk-card-title>
      Lorem ipsum
    </vk-card>

    <vk-card type="secondary">
      <vk-card-title>Secondary</vk-card-title>
      Lorem ipsum
    </vk-card>

    <vk-card type="blank">
      <vk-card-title>Blank</vk-card-title>
      Lorem ipsum
    </vk-card>

    <h2>Hover</h2>

    <vk-card hover>
      <vk-card-title>Hover</vk-card-title>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    </vk-card>

    <h2>Badge</h2>

    <vk-card hover>
      <span class="uk-label" slot="badge">Badge</span>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    </vk-card>

    <h2>Padding</h2>

    <vk-card padding="small">
      <vk-card-title>Small</vk-card-title>
      Lorem ipsum
    </vk-card>

    <vk-card padding="large">
      <vk-card-title>Small</vk-card-title>
      Lorem ipsum
    </vk-card>

    <h2>Header & Footer</h2>

    <vk-card>
      Lorem ipsum
      <vk-card-title slot="header">Title</vk-card-title>
      <template slot="footer">Read more</template>
    </vk-card>

  </div>
</template>
