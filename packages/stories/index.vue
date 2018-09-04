<template>
  <div class="uk-padding">
    <ul class="uk-list">
      <router-link v-for="route in $router.options.routes"
        :key="route.path"
        tag="li"
        :to="{ path: route.path }"
      >
        <a>{{ route.path }}</a>
      </router-link>
    </ul>
  </div>
</template>
