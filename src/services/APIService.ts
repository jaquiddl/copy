import { Api } from "../generated/Api.ts";

const useApi = () => {
  const getAPI = () => {
    const headers: HeadersInit = {
      authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqdWFuLnBlcmV6IiwiQVVUSE9SSVRJRVMiOlt7ImF1dGhvcml0eSI6IlJPTEVfUkVTT1VSQ0VNQU5BR0VSIn1dLCJpYXQiOjE3NDUzNzc3MDQsImV4cCI6MTc0NTM4MTMwNH0.V3rtpZUgH-_fQGbQL3zFf0asOgUFEi-LkYMomUpzzjY",
    };
    return new Api({
      baseUrl: "http://localhost:8081",
      baseApiParams: {
        headers,
      },
    });
  };
  return getAPI;
};
export default useApi;
