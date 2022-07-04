import { apiBaseUrl } from '@/constants';
import { errorType } from '~/modules/common/types';

export const sendFileActionRequest = async (
  reason: string,
  actionType: 'block' | 'unblock',
  fileId: number
): Promise<boolean | errorType> => {
  try {
    const response = await $fetch<{ data: boolean }>(
      `/requests/files/${fileId}`,
      {
        method: 'POST',
        body: {
          reason,
          actionType,
        },
        baseURL: apiBaseUrl,
      }
    );

    if (response.data) {
      return true;
    }
    return false;
  } catch (err: any) {
    return err.data;
  }
};
