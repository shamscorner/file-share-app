<template>
  <section>
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
        <tr v-for="request in requestsResponse.data" :key="request.id">
          <td class="py-3">
            <div>{{ request.file.name }}</div>
            <div class="text-grey">
              - {{ useHumanByteFormat(request.file.size) }}
            </div>
          </td>
          <td>
            <file-status-chip :status="request.file.status" />
          </td>
          <td>
            {{
              $dayjs(request.file.downloadedAt)
                .utc()
                .format('DD-MM-YY | hh:mm:ss')
            }}
          </td>
          <td>
            <user-profile v-if="request.user" :user="request.user" />
          </td>
          <td>
            {{ $dayjs(request.updatedAt).utc().format('DD-MM-YY | hh:mm:ss') }}
          </td>
          <td class="py-3">{{ request.reason }}</td>
          <td>
            <action-block-button
              v-if="
                request.file.status === FileStatusEnum.Open &&
                request.actionType === RequestActionEnum.Block
              "
              class="mr-2"
              @click.stop="openConfirmationDialog('block', request.id)"
            />
            <action-unblock-button
              v-if="
                request.file.status === FileStatusEnum.Blocked &&
                request.actionType === RequestActionEnum.Unblock
              "
              class="mr-2"
              @click.stop="openConfirmationDialog('unblock', request.id)"
            />
            <v-btn
              rounded="pill"
              color="red"
              size="small"
              prepend-icon="mdi-delete"
              variant="tonal"
              @click.stop="openConfirmationDialog('reject', request.id)"
            >
              Reject
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <ClientOnly>
      <confirm-modal
        v-model:show="confirmationModal.show"
        :action="(confirmationModal.action as string)"
        @confirmed="performRequestAction"
      >
        {{ confirmationModal.body }}
      </confirm-modal>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import { RequestActionEnum, RequestType } from '../types';
import { FileStatusEnum } from '~/modules/files/types';
import { USER_LOCAL_KEY } from '~/constants';
import { useAlertDialogStore } from '~/stores/useAlertDialog';
import { errorType } from '~/modules/common/types';

const { getFromLocalStorage } = useLocalStorage();
const { addAlertDialog } = useAlertDialogStore();

const currentUser = getFromLocalStorage<RequestType>(USER_LOCAL_KEY);
const { requestsResponse } = reactive(useRequestsResponse(currentUser.id));

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

const { confirmationModal, openConfirmationDialog } = useConfirmationModal({
  actions,
});

const performRequestAction = (action: string) => {
  confirmationModal.show = false;

  switch (action) {
    // case 'block':
    //   performFileOperation(FileStatusEnum.Blocked);
    //   break;
    // case 'unblock':
    //   performFileOperation(FileStatusEnum.Open);
    // break;
    case 'reject':
      rejectRequest();
  }
};

const rejectRequest = async () => {
  const requestId = confirmationModal.extra as number;
  const response = await rejectRequestService(requestId);

  if (!response.successful) {
    addAlertDialog({
      bodyText: (response as errorType).message,
      type: 'error',
    });
    return;
  }

  requestsResponse.data = requestsResponse.data.filter(
    (request) => request.id !== requestId
  );

  addAlertDialog({
    bodyText: 'Request has been rejected successfully!',
    type: 'success',
  });
};
</script>
