import { useMutation } from "@tanstack/react-query";
import useApi from "./APIService";

export const useAuthenticate = () => {
  const getAPI = useApi();
  return useMutation({ mutationFn: getAPI().auth.authenticate });
};
