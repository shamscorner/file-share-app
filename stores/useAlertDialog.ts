import { defineStore } from 'pinia';
import { AlertDialogType } from '.';

export const useAlertDialogStore = defineStore('alert-dialog', () => {
  const alertDialogs = ref<AlertDialogType[]>([
    // {
    //   bodyText: 'Alert dialog 1',
    //   type: 'success',
    //   id: '1',
    // },
    // {
    //   bodyText: 'Alert dialog 1',
    //   type: 'error',
    //   id: '2',
    // },
    // {
    //   bodyText: 'Alert dialog 3',
    //   type: 'warning',
    //   id: '2',
    // },
    // {
    //   bodyText: 'Alert dialog 4',
    //   type: 'info',
    //   id: '4',
    // },
  ]);

  const alertDialogsRemaining = computed(() => alertDialogs.value);

  const hideDialog = (id: string) => {
    const idx = alertDialogs.value.findIndex((ad) => ad.id === id);
    alertDialogs.value.splice(idx, 1);
  };

  const addAlertDialog = ({ bodyText, type }: Omit<AlertDialogType, 'id'>) => {
    const dialog = {
      bodyText,
      type: type ?? 'info',
      id: Date.now().toString(),
    };

    alertDialogs.value.push(dialog);

    setTimeout(() => {
      hideDialog(dialog.id);
    }, 5000);
  };

  return {
    alertDialogsRemaining,
    addAlertDialog,
    hideDialog,
  };
});
