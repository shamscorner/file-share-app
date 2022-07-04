<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const user = {
  email: 'test@example.com',
  password: 'password',
};

onMounted(async () => {
  await loginUser(user);
});
</script>
