import { API_BASE_URL } from '~/constants';
import { errorType, GlobalResponseType } from '~/modules/common/types';

export const sendFileActionRequest = async (
  reason: string,
  actionType: 'block' | 'unblock',
  fileId: number
): Promise<GlobalResponseType<boolean> | errorType> => {
  try {
    const response = await $fetch<{ data: boolean }>(
      `/requests/files/${fileId}`,
      {
        method: 'POST',
        body: {
          reason,
          actionType,
        },
        baseURL: API_BASE_URL,
        credentials: 'include',
      }
    );

    return {
      data: !!response.data,
      successful: true,
    };
  } catch (err: any) {
    return err.data;
  }
};
