<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Size</th>
        <th class="text-left">Status</th>
        <th class="text-left">Uploaded at</th>
        <th class="text-left">Owner</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="file in filesList" :key="file.id">
        <td>{{ file.fileName }}</td>
        <td>{{ file.fileSize }}</td>
        <td>
          <v-chip
            :color="`${colorStatus(file.status)}-lighten-4`"
            variant="flat"
            class="ml-0 mr-2"
            x-small
          >
            {{ file.status }}
          </v-chip>
        </td>
        <td>{{ file.uploadedAt }}</td>
        <td class="py-2">
          <div class="d-flex align-center">
            <profile-avatar :user="file.owner" class="flex-shrink-0" />
            <div class="ml-2">
              {{ `${file.owner.firstName} ${file.owner.lastName}` }}
            </div>
          </div>
        </td>
        <td>
          <v-btn
            v-if="file.status === FileStatusEnum.Open"
            rounded="pill"
            color="info"
            size="small"
            prepend-icon="mdi-download"
            variant="tonal"
            class="mr-2"
          >
            Download
          </v-btn>
          <v-btn
            v-if="file.status === FileStatusEnum.Open"
            rounded="pill"
            color="error"
            size="small"
            prepend-icon="mdi-block-helper"
            variant="tonal"
            class="mr-2"
          >
            Request Block
          </v-btn>
          <v-btn
            v-if="file.status === FileStatusEnum.Blocked"
            rounded="pill"
            color="warning"
            size="small"
            prepend-icon="mdi-lock-open-variant-outline"
            variant="tonal"
          >
            Request Unblock
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { FileStatusEnum } from '~/features/files/types';
import { mockFilesList } from '~/mocks/data/files-list';

// todo: get this from service
const filesList = reactive(mockFilesList);

const colorStatus = (status: FileStatusEnum): 'teal' | 'red' => {
  return status === FileStatusEnum.Open ? 'teal' : 'red';
};
</script>
