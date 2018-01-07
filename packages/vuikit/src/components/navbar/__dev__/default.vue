<template>
  <div class="uk-padding">

    <h2>Default</h2>

    <navbar>
      <navbar-nav>
        <navbar-nav-item label="Active" active />
        <navbar-nav-item label="Item" />
        <navbar-nav-item label="Item" />
      </navbar-nav>
    </navbar>

    <h2>Multiple Navigation</h2>

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

    <h2>Container modes</h2>

    <navbar container="small">
      <navbar-nav>
        <navbar-nav-item label="Active" active />
        <navbar-nav-item label="Item" />
        <navbar-nav-item label="Item" />
      </navbar-nav>
    </navbar>

    <navbar container="large">
      <navbar-nav>
        <navbar-nav-item label="Active" active />
        <navbar-nav-item label="Item" />
        <navbar-nav-item label="Item" />
      </navbar-nav>
    </navbar>

    <navbar container="expand">
      <navbar-nav>
        <navbar-nav-item label="Active" active />
        <navbar-nav-item label="Item" />
        <navbar-nav-item label="Item" />
      </navbar-nav>
    </navbar>

    <h2>Subtitle</h2>

    <navbar>
      <navbar-nav>
        <navbar-nav-item label="Active" subtitle="Subtitle" active />
        <navbar-nav-item label="Item" subtitle="Subtitle" />
        <navbar-nav-item label="Item" subtitle="Subtitle" />
      </navbar-nav>
    </navbar>

    <h2>Toggle Item</h2>

    <navbar>
      <navbar-toggle />
    </navbar>

    <navbar>
      <navbar-toggle label="Menu" />
    </navbar>

  </div>
</template>

<script>
import * as components from '../'

export default {
  components
}
</script>
