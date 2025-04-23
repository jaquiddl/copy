import { useMutation } from "@tanstack/react-query";
import useApi from "./APIService";

export const useCreateProfile = () => {
  const getAPI = useApi();
  return useMutation({ mutationFn: getAPI().profiles.createProfile });
};
