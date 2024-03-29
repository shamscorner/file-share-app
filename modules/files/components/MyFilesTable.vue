<template>
  <section>
    <div class="mb-2">
      <v-file-input
        v-model="inputFile.data"
        label="File input"
        outlined
        dense
        :show-size="1024"
        :loading="inputFile.uploading"
        style="max-width: 600px"
        @change="uploadFile"
      ></v-file-input>
    </div>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Size</th>
          <th class="text-left">Status</th>
          <th class="text-left">Last Downloaded</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in filesResponse.data" :key="file.id">
          <td class="py-2 max-text">
            {{ file.name }}
          </td>
          <td>{{ useHumanByteFormat(file.size) }}</td>
          <td>
            <file-status-chip :status="file.status" />
          </td>
          <td>
            {{ $dayjs(file.downloadedAt).utc().format('DD-MM-YY | hh:mm:ss') }}
          </td>
          <td>
            <action-download-button
              class="mr-2"
              @click.stop="useDownloadFile(file.downloadUrl)"
            />
            <action-block-button
              v-if="file.status === FileStatusEnum.Open"
              class="mr-2"
              @click.stop="openConfirmationDialog('block', file.id)"
            />
            <action-unblock-button
              v-if="file.status === FileStatusEnum.Blocked"
              @click.stop="openConfirmationDialog('unblock', file.id)"
            />
          </td>
          <td>
            <v-btn
              rounded="pill"
              color="red"
              size="small"
              prepend-icon="mdi-delete"
              variant="tonal"
              @click.stop="openConfirmationDialog('delete', file.id)"
            >
              Delete
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <ClientOnly>
      <confirm-modal
        v-model:show="confirmationModal.show"
        :action="(confirmationModal.action as string)"
        @confirmed="performFileAction"
      >
        {{ confirmationModal.body }}
      </confirm-modal>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import { FileStatusEnum, FileType } from '../types';
import { USER_LOCAL_KEY } from '~/constants';
import { UserType } from '~/modules/users/types';
import { errorType, GlobalResponseType } from '~/modules/common/types';
import { useAlertDialogStore } from '~/stores/useAlertDialog';

const { getFromLocalStorage } = useLocalStorage();
const { addAlertDialog } = useAlertDialogStore();

const inputFile = ref<{ data?: any; uploading: boolean }>({
  uploading: false,
});

const uploadFile = async () => {
  const response = await uploadFileService(inputFile.value.data[0]);

  if (!response.successful) {
    addAlertDialog({
      bodyText: (response as errorType).message,
      type: 'error',
    });
    return;
  }

  filesResponse.data.unshift((response as GlobalResponseType<FileType>).data);
  inputFile.value.data = '';

  addAlertDialog({
    bodyText: 'File has been uploaded successfully!',
    type: 'success',
  });
};

const currentUser = getFromLocalStorage<UserType>(USER_LOCAL_KEY);
const { filesResponse } = reactive(useFilesResponse(currentUser.id));

const actions = {
  block: () => {
    confirmationModal.body = 'Do you really want to block this file?';
  },
  unblock: () => {
    confirmationModal.body = 'Do you really want to unblock this file?';
  },
  delete: () => {
    confirmationModal.body = 'Do you really want to delete this file?';
  },
};

const { confirmationModal, openConfirmationDialog } = useConfirmationModal({
  actions,
});

const performFileAction = (action: string) => {
  confirmationModal.show = false;

  switch (action) {
    case 'block':
      performFileOperation(FileStatusEnum.Blocked);
      break;
    case 'unblock':
      performFileOperation(FileStatusEnum.Open);
      break;
    case 'delete':
      deleteFile();
  }
};

const performFileOperation = async (status: FileStatusEnum) => {
  const fileId = confirmationModal.extra as number;
  const response = await blockOrUnblockFileService(status, fileId);

  if (!response.successful) {
    addAlertDialog({
      bodyText: (response as errorType).message,
      type: 'error',
    });
    return;
  }

  for (const file of filesResponse.data) {
    if (file.id === fileId) {
      file.status = status;
      break;
    }
  }

  const promptMessage =
    status === FileStatusEnum.Blocked ? 'blocked' : 'opened';

  addAlertDialog({
    bodyText: `File has been ${promptMessage} successfully!`,
    type: 'success',
  });
};

const deleteFile = async () => {
  const fileId = confirmationModal.extra as number;
  const response = await deleteFileService(fileId);

  if (!response.successful) {
    addAlertDialog({
      bodyText: (response as errorType).message,
      type: 'error',
    });
    return;
  }

  filesResponse.data = filesResponse.data.filter((file) => file.id !== fileId);

  addAlertDialog({
    bodyText: 'File has been deleted successfully!',
    type: 'success',
  });
};
</script>
