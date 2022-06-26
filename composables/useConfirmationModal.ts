interface ActionType {
  [key: string]: () => void;
}

interface UseConfirmationDialogOptions {
  actions?: ActionType;
}

export function useConfirmationModal(
  options: UseConfirmationDialogOptions = {}
) {
  const { actions } = options;

  const confirmationModal = reactive<{
    show: boolean;
    body: string;
    action: string;
  }>({
    show: false,
    body: '',
    action: '',
  });

  const openConfirmationDialog = (action: string) => {
    if (actions) {
      actions[action]();
    }

    confirmationModal.action = action;
    confirmationModal.show = true;
  };

  return {
    confirmationModal,
    openConfirmationDialog,
  };
}
