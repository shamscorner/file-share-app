<template>
  <section>
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
            <user-profile :user="file.owner" />
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
  </section>
</template>

<script setup lang="ts">
import { sendFileActionRequest } from '../services/send-action-request.service';
import { getFilesService } from '~/features/files/services/get-files.service';
import { FileStatusEnum, FileType } from '~/features/files/types';
import { useAlertDialogStore } from '~/stores';

const { addAlertDialog } = useAlertDialogStore();
const { requestActionModal, requestFileAction } = useRequestActionModal();

const filesList = ref<FileType[]>([]);

onMounted(async () => {
  const files = await getFilesService();
  if (!files) return;

  filesList.value = files;
});

const submitReason = async (reason: string) => {
  requestActionModal.show = false;

  const response = await sendFileActionRequest(
    reason,
    requestActionModal.action
  );

  if (!response) {
    addAlertDialog({
      bodyText: 'Something went wrong!',
      type: 'error',
    });
    return;
  }

  addAlertDialog({
    bodyText: 'Request has been sent successfully!',
    type: 'success',
  });
};
</script>