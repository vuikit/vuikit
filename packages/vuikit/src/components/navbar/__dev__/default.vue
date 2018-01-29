<template>
  <div class="uk-padding">

    <h2>Default</h2>

    <navbar-container>
      <navbar>
        <navbar-nav>
          <navbar-nav-item label="Active" active />
          <navbar-nav-item label="Item" />
          <navbar-nav-item label="Item" />
        </navbar-nav>
      </navbar>
    </navbar-container>

    <h2>Multiple Navigation</h2>

    <navbar-container>
      <navbar>
        <navbar-nav>
          <navbar-nav-item label="Left" active />
        </navbar-nav>

        <navbar-nav slot="center">
          <navbar-nav-item label="Center" active />
        </navbar-nav>

        <navbar-nav slot="right">
          <navbar-nav-item label="Right" active />
        </navbar-nav>
      </navbar>
    </navbar-container>

    <h2>Content Item</h2>

    <navbar-container>
      <navbar>
        <navbar-item>Item</navbar-item>
        <navbar-item slot="center">Item</navbar-item>
        <navbar-item slot="right">Item</navbar-item>
      </navbar>
    </navbar-container>

    <h2>Subtitle</h2>

    <navbar-container>
      <navbar>
        <navbar-nav>
          <navbar-nav-item label="Active" subtitle="Subtitle" active />
          <navbar-nav-item label="Item" subtitle="Subtitle" />
          <navbar-nav-item label="Item" subtitle="Subtitle" />
        </navbar-nav>
      </navbar>
    </navbar-container>

    <h2>Toggle Item</h2>

    <navbar-container>
      <navbar>
        <navbar-toggle />
      </navbar>
    </navbar-container>

    <navbar-container>
      <navbar>
        <navbar-toggle label="Menu" />
      </navbar>
    </navbar-container>

  </div>
</template>

<script>
import * as components from '../'

export default {
  components
}
</script>
