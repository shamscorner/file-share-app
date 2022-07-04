import { RequestType } from '../types';
import { PaginatedDataType } from '~/modules/common/types';

export function useRequestsResponse(ownerId: number = 0) {
  const requestsResponse = reactive<PaginatedDataType<RequestType>>({
    data: [],
    page: 1,
    totalCount: 0,
  });

  onMounted(async () => {
    const response = await getRequestsService(requestsResponse.page, ownerId);
    if (!response.successful) return;

    const { data, page, totalCount } = response.data;

    requestsResponse.data = data;
    requestsResponse.page = page;
    requestsResponse.totalCount = totalCount || 0;
  });

  return {
    requestsResponse,
  };
}
