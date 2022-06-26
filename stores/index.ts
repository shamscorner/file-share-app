export type AlertDialogType = {
  type?: 'success' | 'info' | 'warning' | 'error';
  bodyText: string;
  id: string;
};

export { useAlertDialogStore } from './useAlertDialog';
