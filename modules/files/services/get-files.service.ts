import { FileType } from '../types';

export const getFilesService = async (): Promise<FileType[] | null> => {
  try {
    const files = await $fetch<FileType[]>('/api/files');
    return files;
  } catch (err) {
    return null;
  }
};
