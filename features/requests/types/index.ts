import { FileType } from '~/features/files/types';
import { UserType } from '~~/features/users/types';

export enum RequestActionEnum {
  Block = 'Block',
  Unblock = 'Unblock',
}

export type RequestActionTypes = 'block' | 'unblock' | 'reject';

export type RequestType = {
  id: number;
  user: UserType;
  reason: string;
  action: RequestActionEnum;
  createdAt: string;
  updatedAt: string;
  file: FileType;
};
