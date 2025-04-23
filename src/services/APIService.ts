import { Api } from "../generated/Api.ts";

const useApi = () => {
  const getAPI = () => {
    const headers: HeadersInit = {
      authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqdWFuLnBlcmV6IiwiQVVUSE9SSVRJRVMiOlt7ImF1dGhvcml0eSI6IlJPTEVfUkVTT1VSQ0VNQU5BR0VSIn1dLCJpYXQiOjE3NDUzNzA2NzgsImV4cCI6MTc0NTM3NDI3OH0.bsnulBDked000Z-jiPezo7THsTqwKeLGJ_u407BblVk",
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
