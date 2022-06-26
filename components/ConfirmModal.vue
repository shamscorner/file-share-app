<template>
  <v-dialog :model-value="props.show" persistent max-width="620">
    <v-card>
      <v-card-title>
        <span class="text-h5">
          <slot name="title"> Are you sure? </slot>
        </span>
      </v-card-title>
      <v-card-text>
        <slot> Do you really want to perform this action? </slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          text
          @click="emit('confirmed', props.action)"
        >
          Yes
        </v-btn>
        <v-btn color="green darken-1" text @click="emit('update:show', false)">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
interface Props {
  show?: boolean;
  action?: string;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  action: '',
});

const emit = defineEmits<{
  (event: 'update:show', value: boolean): void;
  (event: 'confirmed', value: string): void;
}>();
</script>
