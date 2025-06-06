export const getUrlSearchParams = (url: string) => {
  return new URLSearchParams(url.split('?')[1]);
};
