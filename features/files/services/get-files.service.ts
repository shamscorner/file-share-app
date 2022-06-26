import { FileType } from '../types';

export const getFilesService = async (): Promise<FileType[] | null> => {
  try {
    const files = await $fetch('/api/files');
    return files as FileType[];
  } catch (err) {
    return null;
  }
};
