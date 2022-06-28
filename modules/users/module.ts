import { join, resolve } from 'path';
import { defineNuxtModule } from '@nuxt/kit';

const AUTO_IMPORT_DIRS = ['./composables', './services'];

export default defineNuxtModule({
  meta: {
    name: 'module-users',
    configKey: 'module-users',
  },
  setup(_, nuxt) {
    // auto register components
    nuxt.hook('components:dirs', (dirs) => {
      dirs.push({
        path: join(__dirname, 'components'),
      });
    });

    // Auto register
    nuxt.hook('autoImports:dirs', (dirs) => {
      AUTO_IMPORT_DIRS.forEach((dir) => {
        dirs.push(resolve(__dirname, dir));
      });
    });
  },
});
