<template>
  <v-app v-if="isLoaded" class="app">
    <v-app-bar elevation="0" color="grey-darken-3" density="compact">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="ml-5" v-text="title" />
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" width="200">
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
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>

    <ClientOnly>
      <div class="app__alert-dialogs-wrap">
        <transition-group name="app__alert-dialog">
          <alert-dialog
            v-for="alertDialog of alertDialogsRemaining"
            :key="alertDialog.id"
            :dialog="alertDialog"
            @hide="hideDialog"
          />
        </transition-group>
      </div>
    </ClientOnly>
  </v-app>
</template>

<script setup lang="ts">
import { useAlertDialogStore } from '~/stores/useAlertDialog';

const { isLoaded } = useLoginComposable();

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

const { alertDialogsRemaining, hideDialog } = useAlertDialogStore();
</script>

<style lang="scss">
.app {
  position: relative;

  &__alert-dialogs-wrap {
    position: fixed;
    top: 10px;
    z-index: 99999;
    right: 20px;
    display: flex;
    flex-direction: column-reverse;

    @media (max-width: 660px) {
      right: 10px;
      left: 10px;
    }
  }

  &__alert-dialog-enter-active,
  &__alert-dialog-leave-active {
    transition: transform 0.4s, opacity 0.4s;
  }

  &__alert-dialog-enter,
  &__alert-dialog-leave-to {
    transform: translateX(50px);
    opacity: 0;
  }
}
</style>
