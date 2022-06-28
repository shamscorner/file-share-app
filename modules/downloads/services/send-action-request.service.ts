export const sendFileActionRequest = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  reason: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  action: 'block' | 'unblock'
): Promise<boolean | null> => {
  try {
    const response = await $fetch<{ data: boolean }>(
      '/api/users/requests/send'
    );
    if (response.data) {
      return true;
    }
    return false;
  } catch (err) {
    return null;
  }
};
