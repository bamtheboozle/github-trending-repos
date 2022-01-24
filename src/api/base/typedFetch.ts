type RequestConfig = {};

const request = async <ResponseDataType>(
  url: string,
  config: RequestConfig = {}
): Promise<ResponseDataType> => {
  const response = await fetch(url, config);
  return response.json();
};
export default request;
