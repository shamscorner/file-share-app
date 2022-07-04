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
          <td>{{ file.size }}</td>
          <td>
            <file-status-chip :status="file.status" />
          </td>
          <td>
            {{ $dayjs(file.downloadedAt).fromNow() }}
          </td>
          <td class="py-2">
            <user-profile :user="file.owner" />
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
import { FileStatusEnum, FileType } from '~/modules/files/types';
import { useAlertDialogStore } from '~/stores/useAlertDialog';
import { errorType, PaginatedDataType } from '@/modules/common/types';

const { addAlertDialog } = useAlertDialogStore();
const { requestActionModal, requestFileAction } = useRequestActionModal();

const filesResponse = reactive<PaginatedDataType<FileType>>({
  data: [],
  page: 1,
  totalCount: 0,
});

onMounted(async () => {
  const response = await getFilesService(filesResponse.page);
  if (!response) return;

  const { data, page, totalCount } = response;

  filesResponse.data = data;
  filesResponse.page = page;
  filesResponse.totalCount = totalCount || 0;
});

const submitReason = async (reason: string) => {
  const { action, fileId } = requestActionModal;
  if (!fileId) return;

  requestActionModal.show = false;

  const response = await sendFileActionRequest(reason, action, fileId);

  if ((response as errorType).message) {
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
