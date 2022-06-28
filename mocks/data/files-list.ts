import { FileType, FileStatusEnum } from '~/modules/files/types';

export const mockFilesList: FileType[] = [
  {
    id: '1',
    fileName: 'Sample file name.jpg',
    fileSize: '64KB',
    uploadedAt: '12 July, 2022',
    status: FileStatusEnum.Open,
    owner: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      avatar: null,
    },
    downloadUrl: '#',
  },
  {
    id: '2',
    fileName: 'Another file.png',
    fileSize: '100KB',
    uploadedAt: '16 July, 2022',
    status: FileStatusEnum.Blocked,
    owner: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      avatar: null,
    },
    downloadUrl: '#',
  },
  {
    id: '3',
    fileName: 'Document file.pdf',
    fileSize: '3MB',
    uploadedAt: '17 July, 2022',
    status: FileStatusEnum.Open,
    owner: {
      id: 2,
      firstName: 'Alex',
      lastName: 'Dane',
      avatar: null,
    },
    downloadUrl: '#',
  },
];
