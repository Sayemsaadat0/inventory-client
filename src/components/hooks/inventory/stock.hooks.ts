import { useMutation, useQuery, useQueryClient } from "react-query";
import { useUser } from "../../context/UserProvider";
import axiosRequest from "../../../lib/axiosRequest";


export const useGetstocksData = () => {
  const { user } = useUser();
  return useQuery({
    queryKey: [`api_stocks`],
    queryFn: () =>
      axiosRequest({
        url: `/stocks/all/${user?.workspace_id}`,
        method: "get",
      }),
  });
};





export const usePoststocksData = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (postData: any) =>
      axiosRequest({
        url: "/stocks",
        method: "post",
        data: postData,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(["api_stocks"]),
    }
  );
};

export const useUpdatestock = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: any) => {
      await axiosRequest({
        url: `/stocks/${id}`,
        method: "put",
        data: data,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["api_stocks"]);
      },
    }
  );
};

export const useDeletestock = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      await axiosRequest({
        url: `/stocks/${id}`,
        method: "delete",
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["api_stocks"]);
      },
    }
  );
};
