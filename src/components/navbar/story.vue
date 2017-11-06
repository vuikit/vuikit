<template>
  <div class="uk-padding">

    <h2>Default</h2>

    <vk-navbar>
      <vk-navbar-nav>
        <vk-navbar-nav-item label="Active" active />
        <vk-navbar-nav-item label="Item" />
        <vk-navbar-nav-item label="Item" />
      </vk-navbar-nav>
    </vk-navbar>

    <h2>Multiple Navigation</h2>

    <vk-navbar>
      <vk-navbar-nav>
        <vk-navbar-nav-item label="Left" active />
      </vk-navbar-nav>

      <vk-navbar-nav slot="center">
        <vk-navbar-nav-item label="Center" active />
      </vk-navbar-nav>

      <vk-navbar-nav slot="right">
        <vk-navbar-nav-item label="Right" active />
      </vk-navbar-nav>
    </vk-navbar>

    <h2>Container modes</h2>

    <vk-navbar container="small">
      <vk-navbar-nav>
        <vk-navbar-nav-item label="Active" active />
        <vk-navbar-nav-item label="Item" />
        <vk-navbar-nav-item label="Item" />
      </vk-navbar-nav>
    </vk-navbar>

    <vk-navbar container="large">
      <vk-navbar-nav>
        <vk-navbar-nav-item label="Active" active />
        <vk-navbar-nav-item label="Item" />
        <vk-navbar-nav-item label="Item" />
      </vk-navbar-nav>
    </vk-navbar>

    <vk-navbar container="expand">
      <vk-navbar-nav>
        <vk-navbar-nav-item label="Active" active />
        <vk-navbar-nav-item label="Item" />
        <vk-navbar-nav-item label="Item" />
      </vk-navbar-nav>
    </vk-navbar>

    <h2>Subtitle</h2>

    <vk-navbar>
      <vk-navbar-nav>
        <vk-navbar-nav-item label="Active" subtitle="Subtitle" active />
        <vk-navbar-nav-item label="Item" subtitle="Subtitle" />
        <vk-navbar-nav-item label="Item" subtitle="Subtitle" />
      </vk-navbar-nav>
    </vk-navbar>

    <h2>Toggle Item</h2>

    <vk-navbar>
      <vk-navbar-toggle />
    </vk-navbar>

    <vk-navbar>
      <vk-navbar-toggle label="Menu" />
    </vk-navbar>

  </div>
</template>
