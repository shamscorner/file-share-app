<template>
  <v-alert
    :type="props.dialog.type"
    :elevation="4"
    closable
    @input="emit('hide', props.dialog.id)"
  >
    {{ props.dialog.bodyText }}
  </v-alert>
</template>

<script setup lang="ts">
import { AlertDialogType } from '~/stores';

interface Props {
  dialog: AlertDialogType;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'hide', value: string): void;
}>();
</script>

<style lang="scss">
.dialog-container {
  max-width: 500px;
  margin-right: 20px;
}
</style>
