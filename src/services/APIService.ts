import { Api } from "../generated/Api.ts";

const useApi = () => {
  const getAPI = () => {
    const headers: HeadersInit = {
      authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqdWFuLnBlcmV6IiwiQVVUSE9SSVRJRVMiOlt7ImF1dGhvcml0eSI6IlJPTEVfREVWRUxPUEVSIn1dLCJpYXQiOjE3NDUyOTY5NzcsImV4cCI6MTc0NTMwMDU3N30.ESQt6sCMqpqIcnFNkGKtIIKsXiLwvVWup2W4nXgDJGU",
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
