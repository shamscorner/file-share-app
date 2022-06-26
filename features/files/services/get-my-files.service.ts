import { FileType } from '../types';

export const getMyFilesService = async (): Promise<FileType[] | null> => {
  try {
    const files = await $fetch('/api/users/files');
    return files as FileType[];
  } catch (err) {
    return null;
  }
};
