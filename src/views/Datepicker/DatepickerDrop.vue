<template>
  <div class="uk-block">
    <h2>Datepicker Drop</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <div class="uk-form">
      <div class="uk-form">
        <input type="text" v-model="input" v-el:input>
      </div>
      <vk-datepicker-drop v-ref:demo
        :dropdown="{
          target: $els.input
        }"
        @pick="input = $arguments[0].format('YYYY-MM-DD')">
      </vk-datepicker-drop>
    </div>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-datepicker-drop</code> component extends <code>vk-datepicker</code>
      wrapping it into a dropdown, thus the demo only reflects the differences.
    </div>
    <!-- TABS -->
    <vk-tabs>
      <vk-tab label="Props">
        <vk-docs-props :props="props"></vk-docs-props>
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code :code="code"></vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import { merge, pick } from 'lodash'
import Component from '../../lib/Datepicker'
import mixin from '../_mixin'

export default {
  mixins: [mixin],
  data: () => ({
    input: '',
    props: merge({}, pick(Component.props, Object.keys(props)), props),
    example
  })
}

const props = {
  dropdown: {
    description: `Props passed to the underlying Dropdown instance. See the
      <a href="/#!/dropdown">Dropdown documentation</a> for the possible values.`
  }
}

const example =
`<input type="text" v-model="input" v-el:input>
<vk-datepicker-drop {attrs}
  :dropdown="{
    target: $els.input
  }"
  @pick="input = $arguments[0].format('YYYY-MM-DD')">
</vk-datepicker-drop>`
</script>
