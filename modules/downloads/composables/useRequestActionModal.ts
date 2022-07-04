export function useRequestActionModal() {
  const requestActionModal = reactive<{
    show: boolean;
    action: 'block' | 'unblock';
    fileId?: number;
  }>({
    show: false,
    action: 'block',
  });

  const requestFileAction = (action: 'block' | 'unblock', fileId: number) => {
    requestActionModal.action = action;
    requestActionModal.show = true;
    requestActionModal.fileId = fileId;
  };

  return {
    requestActionModal,
    requestFileAction,
  };
}
