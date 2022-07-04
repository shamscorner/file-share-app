import { FileType } from '../types';
import { PaginatedDataType, GlobalResponseType } from '@/modules/common/types';
import { API_BASE_URL } from '@/constants';

export const getFilesService = async (
  page: number = 1,
  ownerId: number = 0
): Promise<GlobalResponseType<PaginatedDataType<FileType>>> => {
  try {
    const response = await $fetch<PaginatedDataType<FileType>>(
      `/database-files?ownerId=${ownerId}&page=${page}`,
      {
        baseURL: API_BASE_URL,
      }
    );

    return {
      data: response,
      successful: true,
    };
  } catch (err: any) {
    return err.data;
  }
};
