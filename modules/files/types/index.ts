import { UserType } from '~/modules/users/types';

export enum FileStatusEnum {
  Open = 'open',
  Blocked = 'blocked',
}

export type FileActionTypes = 'block' | 'unblock' | 'edit' | 'delete';

export type FileType = {
  id: number;
  name: string;
  size: number;
  downloadedAt: string;
  status: FileStatusEnum;
  owner: UserType;
  downloadUrl: string;
  mimeType: string;
};
