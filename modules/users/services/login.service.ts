import { apiBaseUrl } from '@/constants';
import { errorType } from '~/modules/common/types';

export type UserPayload = {
  email: string;
  password: string;
};

export const loginUser = async ({
  email,
  password,
}: UserPayload): Promise<boolean | errorType> => {
  try {
    const response = await $fetch<{ data: boolean }>('/authentication/login', {
      method: 'POST',
      body: {
        email,
        password,
      },
      baseURL: apiBaseUrl,
      credentials: 'include',
    });

    if (response.data) {
      return true;
    }
    return false;
  } catch (err: any) {
    return err.data;
  }
};
