import { UserType } from '~/features/users/types';

export enum FileStatusEnum {
  Open = 'Open',
  Blocked = 'Blocked',
}

export type FileType = {
  id: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  status: FileStatusEnum;
  owner: UserType;
  downloadUrl: string;
};
