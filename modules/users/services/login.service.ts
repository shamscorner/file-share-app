import { UserType } from '../types';
import { API_BASE_URL } from '@/constants';
import { errorType } from '~/modules/common/types';

export type UserPayload = {
  email: string;
  password: string;
};

export const loginUser = async ({
  email,
  password,
}: UserPayload): Promise<UserType | errorType> => {
  try {
    const response = await $fetch('/authentication/login', {
      method: 'POST',
      body: {
        email,
        password,
      },
      baseURL: API_BASE_URL,
      credentials: 'include',
    });

    return response as UserType;
  } catch (err: any) {
    return err.data;
  }
};
