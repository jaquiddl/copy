import { useQuery, useMutation } from "@tanstack/react-query";
import useApi from "./APIService.ts";

export const useGetProjects = () => {
  const getApi = useApi();
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await getApi().projects.getAllActiveProjects();
      return Array.isArray(response) ? response : response?.data ?? [];
    },
  });
};

export const useAddProject = () => {
  const getApi = useApi();
  return useMutation({ mutationFn: getApi().projects.addProject });
};
