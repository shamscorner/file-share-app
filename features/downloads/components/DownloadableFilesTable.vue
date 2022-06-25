<template>
  <div>
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
            <file-status-chip :status="file.status" />
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
            <action-download-button
              v-if="file.status === FileStatusEnum.Open"
              class="mr-2"
            />
            <action-block-button
              v-if="file.status === FileStatusEnum.Open"
              class="mr-2"
              @click.stop="requestFileAction('block')"
            >
              Request Block
            </action-block-button>
            <action-unblock-button
              v-if="file.status === FileStatusEnum.Blocked"
              @click.stop="requestFileAction('unblock')"
            >
              Request Unblock
            </action-unblock-button>
          </td>
        </tr>
      </tbody>
    </v-table>

    <ClientOnly>
      <reason-modal
        v-model:show="requestActionModal.show"
        :action="requestActionModal.action"
        @submit="submitReason"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { FileStatusEnum } from '~/features/files/types';
import { mockFilesList } from '~/mocks/data/files-list';

// todo: get this from service on created
const filesList = reactive(mockFilesList);

const requestActionModal = reactive<{
  show: boolean;
  action: 'block' | 'unblock';
}>({
  show: false,
  action: 'block',
});

const requestFileAction = (action: 'block' | 'unblock') => {
  requestActionModal.action = action;
  requestActionModal.show = true;
};

const submitReason = (reason: string) => {
  requestActionModal.show = false;
  // todo: send request to backend
  // eslint-disable-next-line no-console
  console.log(reason);
};
</script>
