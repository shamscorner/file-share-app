<template>
  <section>
    <div class="mb-2">
      <v-btn flat color="info"> Upload Files </v-btn>
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
          <td>{{ file.name }}</td>
          <td>{{ file.size }}</td>
          <td>
            <file-status-chip :status="file.status" />
          </td>
          <td>{{ $dayjs(file.downloadedAt).fromNow() }}</td>
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
import { FileStatusEnum } from '../types';
import { USER_LOCAL_KEY } from '~/constants';
import { UserType } from '~/modules/users/types';
import { errorType } from '~/modules/common/types';
import { useAlertDialogStore } from '~/stores/useAlertDialog';

const { getFromLocalStorage } = useLocalStorage();
const { addAlertDialog } = useAlertDialogStore();

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
    // case 'delete':
  }
};

const performFileOperation = async (status: FileStatusEnum) => {
  const fileId = confirmationModal.extra as number;
  const response = await blockOrUnblockFileService(status, fileId);

  if ((response as errorType).message) {
    addAlertDialog({
      bodyText: (response as errorType).message,
      type: 'error',
    });
    return;
  }

  const promptMessage =
    status === FileStatusEnum.Blocked ? 'blocked' : 'opened';

  addAlertDialog({
    bodyText: `File has been ${promptMessage} successfully!`,
    type: 'success',
  });
};
</script>
