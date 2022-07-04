export function useLocalStorage() {
  const saveToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getFromLocalStorage = <T>(key: string): T => {
    return JSON.parse(localStorage.getItem(key) || '');
  };

  return {
    saveToLocalStorage,
    getFromLocalStorage,
  };
}
