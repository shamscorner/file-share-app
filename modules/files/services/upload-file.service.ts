import { FileType } from '../types';
import { API_BASE_URL } from '~/constants';
import { errorType, GlobalResponseType } from '~/modules/common/types';

export const uploadFileService = async (
  fileData: File
): Promise<GlobalResponseType<FileType> | errorType> => {
  const formData = new FormData();
  formData.append('file', fileData);

  try {
    const response = await $fetch<FileType>('/database-files/upload', {
      method: 'POST',
      body: formData,
      baseURL: API_BASE_URL,
      credentials: 'include',
    });

    return {
      data: response,
      successful: true,
    };
  } catch (err: any) {
    return err.data;
  }
};
