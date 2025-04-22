import { Api } from "../generated/Api.ts";

const useApi = () => {
  const getAPI = () => {
    const headers: HeadersInit = {
      authorization:
        "Bearer " +
<<<<<<< HEAD
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqdWFuLnBlcmV6IiwiQVVUSE9SSVRJRVMiOlt7ImF1dGhvcml0eSI6IlJPTEVfUkVTT1VSQ0VNQU5BR0VSIn1dLCJpYXQiOjE3NDUyOTk2MTcsImV4cCI6MTc0NTMwMzIxN30.BG7vDCpYTY1ABmSFVt1nz_uyHthO0KSyCLpxd3vj01w",
=======
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqdWFuLnBlcmV6IiwiQVVUSE9SSVRJRVMiOlt7ImF1dGhvcml0eSI6IlJPTEVfREVWRUxPUEVSIn1dLCJpYXQiOjE3NDUyOTY5NzcsImV4cCI6MTc0NTMwMDU3N30.ESQt6sCMqpqIcnFNkGKtIIKsXiLwvVWup2W4nXgDJGU",
>>>>>>> 38f681f47ce376213404a1c0ac3a3d82d54805f4
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
