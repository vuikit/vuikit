<template>
  <div class="uk-padding">

    <h2>Divided</h2>
    <vk-tree
      divided
      :data="data"
      :expanded-nodes.sync="expanded"
    />

    <h2>Hoverable</h2>
    <vk-tree
      hoverable
      :data="data"
      :expanded-nodes.sync="expanded"
    />

    <h2>Striped</h2>
    <vk-tree
      striped
      :data="data"
      :expanded-nodes.sync="expanded"
    />

    <h2>Narrowed</h2>
    <vk-tree
      narrowed
      :data="data"
      :expanded-nodes.sync="expanded"
    />

    <h2>All</h2>
    <vk-tree
      divided
      hoverable
      striped
      narrowed
      :data="data"
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
    expanded: []
  })
}
</script>
