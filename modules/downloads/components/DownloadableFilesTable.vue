<template>
  <section>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Size</th>
          <th class="text-left">Status</th>
          <th class="text-left">Last Downloaded</th>
          <th class="text-left">Owner</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in filesResponse.data" :key="file.id">
          <td>{{ file.name }}</td>
          <td>{{ useHumanByteFormat(file.size) }}</td>
          <td>
            <file-status-chip :status="file.status" />
          </td>
          <td>
            {{ $dayjs(file.downloadedAt).utc().format('DD-MM-YY | hh:mm:ss') }}
          </td>
          <td class="py-2">
            <user-profile v-if="file.owner" :user="file.owner" />
          </td>
          <td>
            <action-download-button
              v-if="file.status === FileStatusEnum.Open"
              class="mr-2"
              @click.stop="useDownloadFile(file.downloadUrl)"
            />
            <action-block-button
              v-if="file.status === FileStatusEnum.Open"
              class="mr-2"
              @click.stop="requestFileAction('block', file.id)"
            >
              Request Block
            </action-block-button>
            <action-unblock-button
              v-if="file.status === FileStatusEnum.Blocked"
              @click.stop="requestFileAction('unblock', file.id)"
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
import { FileStatusEnum } from '~/modules/files/types';
import { useAlertDialogStore } from '~/stores/useAlertDialog';
import { errorType } from '@/modules/common/types';

const { addAlertDialog } = useAlertDialogStore();
const { requestActionModal, requestFileAction } = useRequestActionModal();

const { filesResponse } = reactive(useFilesResponse());

const submitReason = async (reason: string) => {
  const { action, fileId } = requestActionModal;
  if (!fileId) return;

  requestActionModal.show = false;

  const response = await sendFileActionRequest(reason, action, fileId);

  if (!response.successful) {
    addAlertDialog({
      bodyText: (response as errorType).message,
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
