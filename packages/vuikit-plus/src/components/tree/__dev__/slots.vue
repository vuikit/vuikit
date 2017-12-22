<template>
  <div class="uk-padding">

    <h2>Default Scoped Slot</h2>

    <vk-tree
      striped
      divided
      :data="data"
      :expanded-nodes.sync="expanded"
    >
      <div class="uk-flex uk-flex-between uk-flex-center" slot-scope="node">
        <span class="vk-tree-node__label">
          {{ node.data.name }}
        </span>
        <a @click.prevent>Add / Remove</a>
      </div>
    </vk-tree>

  </div>
</template>

<script>
import data from './data.json'

import { Tree as VkTree } from '../'

export default {
  components: {
    VkTree
  },
  data: () => ({
    data,
    expanded: []
  })
}
</script>
