/* eslint-disable import/no-named-as-default-member */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export default defineNuxtPlugin((nuxtApp) => {
  dayjs.extend(utc);
  nuxtApp.provide('dayjs', dayjs);
});

declare module '#app' {
  interface NuxtApp {
    $dayjs: dayjs.Dayjs;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dayjs(date?: dayjs.ConfigType): dayjs.Dayjs;
  }
}
