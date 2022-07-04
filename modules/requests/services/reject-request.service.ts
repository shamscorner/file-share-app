import { API_BASE_URL } from '~/constants';
import { errorType, GlobalResponseType } from '~/modules/common/types';

export const rejectRequestService = async (
  requestId: number
): Promise<GlobalResponseType<void> | errorType> => {
  try {
    const response = await $fetch<{ data: void }>(`/requests/${requestId}`, {
      method: 'DELETE',
      baseURL: API_BASE_URL,
      credentials: 'include',
    });

    return {
      data: response.data,
      successful: true,
    };
  } catch (err: any) {
    return err.data;
  }
};
