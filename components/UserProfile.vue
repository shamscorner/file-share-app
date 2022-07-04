<template>
  <div class="d-flex align-center">
    <profile-avatar :user="props.user" class="flex-shrink-0" />
    <div class="ml-2">
      {{ `${props.user.firstName} ${props.user.lastName}` }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserType } from '~/modules/users/types';

interface Props {
  user: UserType;
}

const props = defineProps<Props>();
</script>
