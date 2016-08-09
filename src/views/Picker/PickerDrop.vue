<template>
  <div class="uk-block">
    <h2>Picker Drop</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <div class="uk-form">
      <input type="text" v-model="input" v-el:input>
    </div>
    <vk-picker-drop v-ref:demo
      :pickables="[{ name: 'id' }, 'hits']"
      :dropdown-target="$els.input"
      :table-fields="['name', 'hits', 'description']"
      :table-rows="[{
        id: 1,
        name: 'Item 1',
        hits: 34,
        description: 'The item description'
      }, {
        id: 2,
        name: 'Item 2',
        hits: 56,
        description: 'The item description'
      }]"
      @pick="input = $arguments[0]">
    </vk-picker-drop>
    <span v-html="message"></span>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-picker-drop</code> component extends <code>vk-picker</code>
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
import Component from '../../lib/PickerDrop'
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
  'table-*': {
    description: `Props passed to the underlying Table instance prefixed with
      <code>table-</code>. See the <a href="/vuikit/#!/table">Table documentation</a>
      for all possible values.`
  },
  'dropdown-*': {
    description: `Props passed to the underlying Dropdown instance prefixed with
      <code>dropdown-</code>. See the <a href="/vuikit/#!/dropdown">Dropdown documentation</a>
      for all possible values.`
  }
}

const example =
`<input type="text" v-model="input" v-el:input>
<vk-picker-drop {attrs}
  :pickables="[{ name: 'id' }, 'hits']"
  :dropdown-target="$els.input"
  :table-fields="['name', 'hits', 'description']"
  :table-rows="[{
    id: 1,
    name: 'Item 1',
    hits: 34,
    description: 'The item description'
  }, {
    id: 2,
    name: 'Item 2',
    hits: 56,
    description: 'The item description'
  }]"
  @pick="input = $arguments[0]">
</vk-picker-drop>`
</script>
