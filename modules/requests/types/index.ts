import { FileType } from '~/modules/files/types';
import { UserType } from '~/modules/users/types';

export enum RequestActionEnum {
  Block = 'block',
  Unblock = 'unblock',
}

export type RequestActionTypes = 'block' | 'unblock' | 'reject';

export type RequestType = {
  id: number;
  user: UserType;
  reason: string;
  actionType: RequestActionEnum;
  createdAt: Date;
  updatedAt: Date;
  file: FileType;
};
