<template>
  <div class="uk-padding">
    <ul class="uk-list">
      <router-link v-for="route in $router.options.routes"
        :key="route.name"
        tag="li"
        :to="{ name: route.name }"
      >
        <a>{{ route.path }}</a>
      </router-link>
    </ul>
  </div>
</template>
