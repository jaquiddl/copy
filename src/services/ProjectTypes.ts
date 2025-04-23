import { useQuery } from "@tanstack/react-query";
import useApi from "./APIService";

export const useGetProjectTypes = () => {
  const getAPI = useApi();
  const query = useQuery({
    queryKey: ["projecTypes"],
    queryFn: () => getAPI().projectTypes.getAllProjectTypes({ format: "json" }),
  });
  return query;
};
