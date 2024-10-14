import { useQuery } from "react-query";
import useAxios from "./useAxios";

// Define types for the hook arguments and return values
type UseDynamicDataParams = {
  queryKey: string;
  url: string;
  callback?: (data: any) => void;
};

const useDynamicData = ({ queryKey, url, callback }: UseDynamicDataParams) => {
  const axiosAdmin = useAxios();

  const {
    data = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await axiosAdmin.get(url);
      return response.data;
    },
    onSuccess: (responseData: any) => {
      // Call the callback function with the response data if provided
      if (callback && typeof callback === "function") {
        callback(responseData);
      }
    },
  });

  return { data, isLoading, refetch };
};

export default useDynamicData;
