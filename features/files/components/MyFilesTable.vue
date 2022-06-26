<template>
  <div>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Size</th>
          <th class="text-left">Status</th>
          <th class="text-left">Uploaded at</th>
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
          <td>
            <action-download-button
              v-if="file.status === FileStatusEnum.Open"
              class="mr-2"
            />
            <action-block-button
              v-if="file.status === FileStatusEnum.Open"
              class="mr-2"
              @click.stop="openConfirmationDialog('block')"
            />
            <action-unblock-button
              v-if="file.status === FileStatusEnum.Blocked"
              @click.stop="openConfirmationDialog('unblock')"
            />
          </td>
          <td>
            <v-btn
              rounded="pill"
              color="primary"
              size="small"
              prepend-icon="mdi-pencil"
              variant="tonal"
              class="mr-2"
            >
              Edit
            </v-btn>
            <v-btn
              rounded="pill"
              color="red"
              size="small"
              prepend-icon="mdi-delete"
              variant="tonal"
              @click.stop="openConfirmationDialog('delete')"
            >
              Delete
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <ClientOnly>
      <confirmation-modal
        v-model:show="confirmationModal.show"
        :action="(confirmationModal.action as string)"
        @confirmed="performFileAction"
      >
      </confirmation-modal>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { getMyFilesService } from '../services/get-my-files.service';
import { FileStatusEnum, FileType } from '~/features/files/types';

const filesList = ref<FileType[]>([]);

onMounted(async () => {
  const files = await getMyFilesService();
  if (!files) return;

  filesList.value = files;
});

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

// todo: refactor to composable
// const actions = {
//   block: () => {
//     console.log('blocking the file');
//   },
//   unblock: () => {
//     console.log('unblocking the file');
//   },
//   edit: () => {
//     console.log('updating the file');
//   },
//   delete: () => {
//     console.log('deleting the file');
//   },
// };

const performFileAction = (action: string) => {
  confirmationModal.show = false;

  // todo: perform action
  // eslint-disable-next-line no-console
  console.log(action);
};
</script>
