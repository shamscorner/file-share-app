import { FileType } from '../types';
import { PaginatedDataType } from '~/modules/common/types';

export function useFilesResponse(ownerId: number = 0) {
  const filesResponse = reactive<PaginatedDataType<FileType>>({
    data: [],
    page: 1,
    totalCount: 0,
  });

  onMounted(async () => {
    const response = await getFilesService(filesResponse.page, ownerId);
    if (!response) return;

    const { data, page, totalCount } = response;

    filesResponse.data = data;
    filesResponse.page = page;
    filesResponse.totalCount = totalCount || 0;
  });

  return {
    filesResponse,
  };
}
