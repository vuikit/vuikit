<template>
  <div class="uk-padding">

    <vk-card class="test-fixed">
      <keep-alive>
        <vk-scrollspy-nav closest="li">
          <vk-nav>
            <vk-nav-item
              title="Update Sections"
              @click="updateSections"
            ></vk-nav-item>
            <vk-nav-item-divider></vk-nav-item-divider>
            <vk-nav-item
              v-for="({ id, title }) in sections"
              :key="id"
              :title="title"
              :href="`#${id}`"
              v-vk-scroll
            ></vk-nav-item>
          </vk-nav>
        </vk-scrollspy-nav>
      </keep-alive>
    </vk-card>

    <div class="uk-container">

      <h1>ScrollspyNav</h1>

      <template v-for="{ title, id } in sections">
        <h2 :id="id">{{ title }}</h2>
        <div style="height: 500px;"></div>
      </template>

    </div>

  </div>
</template>

<script>
export default {
  data: () => ({
    other: 1,
    sections: [
      { title: 'Section 1', id: 'section-1' },
      { title: 'Section 2', id: 'section-2' },
      { title: 'Section 3', id: 'section-3' },
      { title: 'Section 4', id: 'section-4' }
    ]
  }),
  methods: {
    updateSections () {
      this.sections = [
        { title: 'New Section 1', id: 'new-section-1' },
        { title: 'New Section 2', id: 'new-section-2' },
        { title: 'New Section 3', id: 'new-section-3' },
        { title: 'New Section 4', id: 'new-section-4' }
      ]
    }
  }
}
</script>

<style scoped>
.test-fixed {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1;
}
</style>
