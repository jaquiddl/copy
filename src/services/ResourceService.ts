import { useQuery, useMutation } from "@tanstack/react-query";
import useApi from "./APIService.ts";

export const useGetResources = () => {
  const getAPI = useApi();
  const query = useQuery({
    queryKey: ["resources"],
    queryFn: () => getAPI().resources.getAllResources(),
  });
  return query;
};

export const useGetResourceById = (resourceId: number) => {
  const getAPI = useApi();
  const query = useQuery({
    queryKey: ["resourceDetails", resourceId],
    queryFn: () => getAPI().resources.getResourceById(resourceId),
    select: (data) => {
      return data;
    },
  });
  return query;
};

export const useAddResource = () => {
  const getAPI = useApi();
  return useMutation({ mutationFn: getAPI().resources.createResource });
};
