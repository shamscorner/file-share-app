<template>
  <div>
    <v-avatar color="grey" size="40">
      <img v-if="user.avatar" :src="user.avatar" :alt="user.firstName" />
      <span v-else class="text-white font-weight-bold">
        {{ nameInitials }}
      </span>
    </v-avatar>
  </div>
</template>

<script setup lang="ts">
import { UserType } from '~/features/users/types';

interface Props {
  user: UserType;
}

const props = defineProps<Props>();

const nameInitials = computed(() => {
  let nameInitials = props.user.firstName[0];
  if (props.user.lastName) {
    nameInitials = `${nameInitials}${props.user.lastName[0]}`;
  }
  return nameInitials.toUpperCase();
});
</script>
