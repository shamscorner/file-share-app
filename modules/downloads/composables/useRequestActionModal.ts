export function useRequestActionModal() {
  const requestActionModal = reactive<{
    show: boolean;
    action: 'block' | 'unblock';
  }>({
    show: false,
    action: 'block',
  });

  const requestFileAction = (action: 'block' | 'unblock') => {
    requestActionModal.action = action;
    requestActionModal.show = true;
  };

  return {
    requestActionModal,
    requestFileAction,
  };
}
