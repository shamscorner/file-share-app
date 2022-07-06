import { UserType } from '../types';
import { USER_LOCAL_KEY, userData } from '~/constants';
import { useAlertDialogStore } from '~/stores/useAlertDialog';
import { errorType } from '~/modules/common/types';

export function useLoginComposable() {
  const isLoaded = ref(false);

  const user = userData;

  const { saveToLocalStorage } = useLocalStorage();
  const { addAlertDialog } = useAlertDialogStore();

  onMounted(async () => {
    const response = await loginUser(user);

    if ((response as UserType).id) {
      saveToLocalStorage(USER_LOCAL_KEY, response as UserType);
    } else {
      addAlertDialog({
        bodyText: (response as errorType).message,
        type: 'error',
      });
      return;
    }

    isLoaded.value = true;
  });

  return {
    isLoaded,
  };
}
