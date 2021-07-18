export const genericService = (
  url: string,
  successCallback: (data: any) => void,
  failCallback: (error: Error) => void
) => {
  try {
    fetch(url).then((response) => response.json().then(successCallback));
  } catch (error) {
    failCallback(error);
  }
};
