import { join, resolve } from 'path';
import { defineNuxtModule } from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'module-requests',
    configKey: 'module-requests',
  },
  setup(_, nuxt) {
    // auto register components
    nuxt.hook('components:dirs', (dirs) => {
      dirs.push({
        path: join(__dirname, 'components'),
      });
    });

    // Auto register composables
    nuxt.hook('autoImports:dirs', (dirs) => {
      dirs.push(resolve(__dirname, './composables'));
    });

    // Auto register pages
    nuxt.hook('pages:extend', (pages) => {
      pages.push({
        name: 'page-requests',
        path: '/requests',
        file: resolve(__dirname, './pages/requests.vue'),
      });
    });
  },
});
