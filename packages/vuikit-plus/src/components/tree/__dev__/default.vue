<template>
  <div class="uk-padding">

    <h2>Default</h2>
    <vk-tree
      :data="data"
      :expanded-nodes.sync="expanded"
    />

    <h2>Active Nodes</h2>
    <vk-tree
      :data="data"
      :active-nodes="['_1']"
      :expanded-nodes.sync="expanded"
    />

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
    expanded: [],
    expandedOnClick: []
  })
}
</script>
