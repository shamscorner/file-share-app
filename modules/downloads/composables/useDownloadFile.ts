export interface DownloadOptions {
  customName?: string;
  isNewWindow?: boolean;
}

export function useDownloadFile(
  downloadUrl: string,
  options: DownloadOptions = {}
) {
  const { customName, isNewWindow } = options;
  const link = document.createElement('a');
  link.href = downloadUrl;

  if (customName) {
    link.setAttribute('download', customName);
  }

  if (isNewWindow) {
    link.setAttribute('target', '_blank');
  }

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
