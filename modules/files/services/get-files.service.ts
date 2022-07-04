import { FileType } from '../types';
import { PaginatedDataType } from '@/modules/common/types';
import { API_BASE_URL } from '@/constants';

export const getFilesService = async (
  page: number = 1,
  ownerId: number = 0
): Promise<PaginatedDataType<FileType> | null> => {
  try {
    const response = await $fetch<PaginatedDataType<FileType> | null>(
      `/database-files?ownerId=${ownerId}&page=${page}`,
      {
        baseURL: API_BASE_URL,
      }
    );
    return response;
  } catch (err) {
    return null;
  }
};
