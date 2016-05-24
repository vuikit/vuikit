<template>
  <div>
    <docs-page
      :props="props"
      :code="code">
      <div slot="demo">
        <vk-badge v-ref:demo
          :style="props.style.value">
          Info
        </vk-badge>
      </div>
      <div slot="desc">
        Badge component <code>vk-badge</code> will render a nice looking highlighted text.
      </div>
    </docs-page>
  </div>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  data: () => ({
    props: Helper.getProps('Badge', props),
    code
  })
}

const code = '<vk-badge>Information</vk-badge>'

const props = {
  style: {
    description: 'Determines the style of badge.',
    options: ['default', 'notice', 'success', 'warning', 'danger']
  }
}

</script>
