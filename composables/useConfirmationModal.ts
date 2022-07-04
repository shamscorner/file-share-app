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
    extra?: any;
  }>({
    show: false,
    body: '',
    action: '',
  });

  const openConfirmationDialog = (action: string, extra: any) => {
    if (actions) {
      actions[action]();
    }

    confirmationModal.action = action;
    confirmationModal.extra = extra;
    confirmationModal.show = true;
  };

  return {
    confirmationModal,
    openConfirmationDialog,
  };
}
