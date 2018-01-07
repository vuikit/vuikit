<template>
  <div class="uk-padding">

    <card>
      <card-title>Title</card-title>
      Lorem ipsum
    </card>

    <h2>Styles</h2>

    <card>
      <card-title>Default</card-title>
      Lorem ipsum
    </card>

    <card type="primary">
      <card-title>Primary</card-title>
      Lorem ipsum
    </card>

    <card type="secondary">
      <card-title>Secondary</card-title>
      Lorem ipsum
    </card>

    <card type="blank">
      <card-title>Blank</card-title>
      Lorem ipsum
    </card>

    <h2>Hover</h2>

    <card hover>
      <card-title>Hover</card-title>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    </card>

    <h2>Badge</h2>

    <card hover>
      <span class="uk-label" slot="badge">Badge</span>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    </card>

    <h2>Padding</h2>

    <card padding="small">
      <card-title>Small</card-title>
      Lorem ipsum
    </card>

    <card padding="large">
      <card-title>Large</card-title>
      Lorem ipsum
    </card>

    <h2>Header & Footer</h2>

    <card>
      Lorem ipsum
      <card-title slot="header">Title</card-title>
      <template slot="footer">Read more</template>
    </card>

  </div>
</template>

<script>
import * as components from '../'

export default {
  components
}
</script>
