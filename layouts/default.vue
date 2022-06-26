<template>
  <v-app dark>
    <v-app-bar elevation="0" color="grey-darken-3" prominent fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="ml-5" v-text="title" />
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list nav class="mt-5">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          router
          exact
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const drawer = ref(true);
const title = ref('Awesome File Sharing');

const items = ref([
  {
    icon: 'mdi-apps',
    title: 'Home',
    to: '/',
  },
  {
    icon: 'mdi-file-multiple',
    title: 'My Files',
    to: '/my-files',
  },
  {
    icon: 'mdi-bell-badge',
    title: 'Requests',
    to: '/requests',
  },
]);
</script>
