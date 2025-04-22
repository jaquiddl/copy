import { Api } from "../generated/Api.ts";

const useApi = () => {
  const getAPI = () => {
    const headers: HeadersInit = {
      authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqdWFuLnBlcmV6IiwiQVVUSE9SSVRJRVMiOlt7ImF1dGhvcml0eSI6IlJPTEVfUkVTT1VSQ0VNQU5BR0VSIn1dLCJpYXQiOjE3NDUyOTk2MTcsImV4cCI6MTc0NTMwMzIxN30.BG7vDCpYTY1ABmSFVt1nz_uyHthO0KSyCLpxd3vj01w",
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
