import { RequestType } from '../types';

export const getRequestsService = async (): Promise<RequestType[] | null> => {
  try {
    const files = await $fetch('/api/users/requests');
    return files as RequestType[];
  } catch (err) {
    return null;
  }
};
