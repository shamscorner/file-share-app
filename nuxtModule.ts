import { join, resolve } from 'path';
import { defineNuxtModule } from '@nuxt/kit';

export interface PageType {
  routeName: string;
  path: string;
  fileLocation: string;
}

export interface ModuleOptions {
  name: string;
  configKey: string;
  pages: PageType[];
}

export function useNuxtModule(
  currentDirectory: string,
  moduleOptions: ModuleOptions
) {
  const { name, configKey, pages: modulePages } = moduleOptions;

  return defineNuxtModule({
    meta: {
      name,
      configKey,
    },
    setup(_, nuxt) {
      // auto register components
      nuxt.hook('components:dirs', (dirs) => {
        dirs.push({
          path: join(currentDirectory, 'components'),
        });
      });

      // Auto register composables
      nuxt.hook('autoImports:dirs', (dirs) => {
        dirs.push(resolve(currentDirectory, './composables'));
      });

      // Auto register pages
      nuxt.hook('pages:extend', (pages) => {
        modulePages.forEach(({ routeName, path, fileLocation }) => {
          pages.push({
            name: routeName,
            path,
            file: resolve(currentDirectory, fileLocation),
          });
        });
      });
    },
  });
}
