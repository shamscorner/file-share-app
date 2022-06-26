import { RequestType, RequestActionEnum } from '~/features/requests/types';
import { mockFilesList } from '~/mocks/data/files-list';

export const mockRequestsList: RequestType[] = [
  {
    id: 1,
    user: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      avatar: null,
    },
    file: mockFilesList[0],
    reason: 'A valid reason',
    action: RequestActionEnum.Block,
    createdAt: '3 June, 2022',
    updatedAt: '14 June, 2022',
  },
  {
    id: 2,
    user: {
      id: 2,
      firstName: 'Alex',
      lastName: 'Dane',
      avatar: null,
    },
    file: mockFilesList[0],
    reason: 'Another reason',
    action: RequestActionEnum.Block,
    createdAt: '5 June, 2022',
    updatedAt: '8 June, 2022',
  },
  {
    id: 3,
    user: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      avatar: null,
    },
    file: mockFilesList[1],
    reason: 'The content has abusive words.',
    action: RequestActionEnum.Unblock,
    createdAt: '8 June, 2022',
    updatedAt: '22 June, 2022',
  },
  {
    id: 4,
    user: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      avatar: null,
    },
    file: mockFilesList[2],
    reason: 'Some points are malicious.',
    action: RequestActionEnum.Block,
    createdAt: '15 June, 2022',
    updatedAt: '29 June, 2022',
  },
];
