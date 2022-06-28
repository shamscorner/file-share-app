<template>
  <v-chip
    :color="`${colorStatus}-lighten-4`"
    variant="flat"
    class="ml-0 mr-2"
    x-small
  >
    {{ props.status }}
  </v-chip>
</template>

<script setup lang="ts">
import { FileStatusEnum } from '../types';

interface Props {
  status: FileStatusEnum;
}

const props = defineProps<Props>();

const colorStatus = computed(() =>
  props.status === FileStatusEnum.Open ? 'teal' : 'red'
);
</script>
