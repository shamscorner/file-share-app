<template>
  <div>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Status</th>
          <th class="text-left">Uploaded at</th>
          <th class="text-left">Requester</th>
          <th class="text-left">Requested at</th>
          <th class="text-left">Reason</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in requestsList" :key="request.id">
          <td class="py-3">
            <div>{{ request.file.fileName }}</div>
            <div class="text-grey">- {{ request.file.fileSize }}</div>
          </td>
          <td>
            <file-status-chip :status="request.file.status" />
          </td>
          <td>{{ request.file.uploadedAt }}</td>
          <td>
            <user-profile :user="request.user" />
          </td>
          <td>{{ request.updatedAt }}</td>
          <td class="py-3">{{ request.reason }}</td>
          <td>
            <action-block-button
              v-if="
                request.file.status === FileStatusEnum.Open &&
                request.action === RequestActionEnum.Block
              "
              class="mr-2"
              @click.stop="openConfirmationDialog('block')"
            />
            <action-unblock-button
              v-if="
                request.file.status === FileStatusEnum.Blocked &&
                request.action === RequestActionEnum.Unblock
              "
              class="mr-2"
              @click.stop="openConfirmationDialog('unblock')"
            />
            <v-btn
              rounded="pill"
              color="red"
              size="small"
              prepend-icon="mdi-delete"
              variant="tonal"
              @click.stop="openConfirmationDialog('reject')"
            >
              Reject
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <ClientOnly>
      <confirmation-modal
        v-model:show="confirmationModal.show"
        :action="(confirmationModal.action as string)"
        @confirmed="performRequestAction"
      >
      </confirmation-modal>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { getRequestsService } from '../services/get-requests.service';
import {
  RequestActionTypes,
  RequestActionEnum,
  RequestType,
} from '~/features/requests/types';
import { FileStatusEnum } from '~/features/files/types';

const requestsList = ref<RequestType[]>([]);

onMounted(async () => {
  const requests = await getRequestsService();
  if (!requests) return;

  requestsList.value = requests;
});

// todo: refactor to composable
const confirmationModal = reactive<{
  show: boolean;
  body: string;
  action: RequestActionTypes;
}>({
  show: false,
  body: '',
  action: 'reject',
});

const actions = {
  block: () => {
    confirmationModal.body = 'Do you really want to block this file?';
  },
  unblock: () => {
    confirmationModal.body = 'Do you really want to unblock this file?';
  },
  reject: () => {
    confirmationModal.body = 'Do you really want to reject this file?';
  },
};

const openConfirmationDialog = (action: 'block' | 'unblock' | 'reject') => {
  actions[action]();
  confirmationModal.action = action;
  confirmationModal.show = true;
};

// todo: refactor to composable
// const actions = {
//   block: () => {
//     console.log('blocking the request');
//   },
//   unblock: () => {
//     console.log('unblocking the request');
//   },
//   reject: () => {
//     console.log('rejecting the request');
//   },
// };

const performRequestAction = (action: string) => {
  confirmationModal.show = false;

  // todo: perform action
  // eslint-disable-next-line no-console
  console.log(action);
};
</script>
