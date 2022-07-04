import { FileType } from '../types';
import { PaginatedDataType } from '@/modules/common/types';
import { apiBaseUrl } from '@/constants';

export const getFilesService = async (
  page: number
): Promise<PaginatedDataType<FileType> | null> => {
  try {
    const response = await $fetch<PaginatedDataType<FileType> | null>(
      `/database-files?page=${page}`,
      {
        baseURL: apiBaseUrl,
      }
    );
    return response;
  } catch (err) {
    return null;
  }
};
