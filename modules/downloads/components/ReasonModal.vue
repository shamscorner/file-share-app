<template>
  <v-dialog :model-value="props.show" persistent max-width="620">
    <v-card>
      <v-card-title>
        <span class="text-h5">
          Give a reason to {{ props.action }} this file
        </span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="">
          <v-textarea
            id="input-reason"
            v-model="formData.reason"
            label="Enter Reasons"
            :rules="[(v) => !!v || 'Required']"
            auto-grow
            required
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" text @click="emit('update:show', false)">
          Close
        </v-btn>
        <v-btn color="blue-darken-1" text @click="submit"> Submit </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
interface Props {
  show?: boolean;
  action?: 'block' | 'unblock';
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  action: 'block',
});

const emit = defineEmits<{
  (event: 'update:show', value: boolean): void;
  (event: 'submit', value: string): void;
}>();

const form = ref<{ validate: () => void } | null>(null);
const valid = ref(true);
const formData = reactive({
  reason: '',
});

const submit = () => {
  if (form.value) {
    form.value.validate();
  }

  if (!valid.value) return;

  emit('submit', formData.reason);
};
</script>
