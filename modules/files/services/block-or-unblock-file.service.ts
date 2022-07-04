import { FileStatusEnum, FileType } from '../types';
import { API_BASE_URL } from '~/constants';
import { errorType, GlobalResponseType } from '~/modules/common/types';

export const blockOrUnblockFileService = async (
  status: FileStatusEnum,
  fileId: number,
  requestId: number = 0
): Promise<GlobalResponseType<FileType> | errorType> => {
  try {
    const response = await $fetch<{ data: FileType }>(
      `/database-files/${fileId}?requestId=${requestId}`,
      {
        method: 'PATCH',
        body: {
          status,
        },
        baseURL: API_BASE_URL,
        credentials: 'include',
      }
    );

    return {
      data: response.data,
      successful: true,
    };
  } catch (err: any) {
    return err.data;
  }
};
