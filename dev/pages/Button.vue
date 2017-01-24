<template>
  <div>
    <div class="uk-child-width-1-4@m" uk-grid>
      <div class="uk-width-1-2@m">
        <p>
          <a class="uk-button uk-button-default" href="#">Link</a>
          <vk-button>Button</vk-button>
          <vk-button active>Active</vk-button>
          <vk-button disabled>Disabled</vk-button>
        </p>
        <p>
          <a class="uk-button uk-button-primary" href="#">Link</a>
          <vk-button class="uk-button-primary">Button</vk-button>
          <vk-button class="uk-button-primary" active>Active</vk-button>
          <vk-button class="uk-button-primary" disabled>Disabled</vk-button>
        </p>
        <p>
          <a class="uk-button uk-button-secondary" href="#">Link</a>
          <vk-button class="uk-button-secondary">Button</vk-button>
          <vk-button class="uk-button-secondary" active>Active</vk-button>
          <vk-button class="uk-button-secondary" disabled>Disabled</vk-button>
        </p>
        <p>
          <a class="uk-button uk-button-danger" href="#">Link</a>
          <vk-button class="uk-button-danger">Button</vk-button>
          <vk-button class="uk-button-danger" active>Active</vk-button>
          <vk-button class="uk-button-danger" disabled>Disabled</vk-button>
        </p>
      </div>
      <div>
        <p>
          <a class="uk-button uk-button-text" href="#">Link</a>
          <vk-button class="uk-button-text">Button</vk-button>
          <vk-button class="uk-button-text" disabled>Disabled</vk-button>
        </p>
      </div>
      <div>
        <p>
          <vk-button>Button</vk-button>
          <vk-button class="uk-button-link">Button</vk-button>
        </p>
        <p>
          <vk-button disabled>Button</vk-button>
          <vk-button class="uk-button-link" disabled>Button</vk-button>
        </p>
        <p>
          <a href="#">Link</a>
          <vk-button class="uk-button-link uk-text-baseline">Button</vk-button>
        </p>
      </div>
    </div>
    <h2>Button Checkbox</h2>
    <div class="uk-child-width-1-4@m" uk-grid>
      <div class="uk-width-1-2@m">
        <vk-button-checkbox
          :value="demo.checkbox"
          @change="value => {
            demo.checkbox = value
          }">
          <vk-button :value="1">Button 1</vk-button>
          <vk-button :value="2">Button 2</vk-button>
          <vk-button :value="3">Button 3</vk-button>
        </vk-button-checkbox>
      </div>
      <div class="uk-width-1-2@m">
        <vk-button-checkbox group
          :value="demo.checkbox"
          @change="value => {
            demo.checkbox = value
          }">
          <vk-button :value="1">Button 1</vk-button>
          <vk-button :value="2">Button 2</vk-button>
          <vk-button :value="3">Button 3</vk-button>
        </vk-button-checkbox>
      </div>
    </div>
    <h2>Button Radio</h2>
    <div class="uk-child-width-1-4@m" uk-grid>
      <div class="uk-width-1-2@m">
        <vk-button-radio
          :value="demo.radio"
          @change="value => {
            demo.radio = value
          }">
          <vk-button :value="1">Button 1</vk-button>
          <vk-button :value="2">Button 2</vk-button>
          <vk-button :value="3">Button 3</vk-button>
        </vk-button-radio>
      </div>
      <div class="uk-width-1-2@m">
        <vk-button-radio group
          :value="demo.radio"
          @change="value => {
            demo.radio = value
          }">
          <vk-button :value="1">Button 1</vk-button>
          <vk-button :value="2">Button 2</vk-button>
          <vk-button :value="3">Button 3</vk-button>
        </vk-button-radio>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    demo: {
      checkbox: [1],
      radio: 1
    }
  })
}
</script>
