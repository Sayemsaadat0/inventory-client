import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosRequest from "../../../lib/axiosRequest";
import { useUser } from "../../context/UserProvider";



export const useGetOrdersData = () => {
  const { user } = useUser();
  return useQuery({
    queryKey: [`api_order_list`],
    queryFn: () =>
      axiosRequest({
        url: `/orders/all/${user?.workspace_id}`,
        method: "get",
      }),
  });
};



export const useCreateOrdersData = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (postData: any) =>
      axiosRequest({
        url: "/orders",
        method: "post",
        data: postData,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(["api_order_list"]),
    }
  );
};

// chalan

export const useConfirmChalan = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      await axiosRequest({
        url: `/orders/done-chalan/${id}`,
        method: "PATCH",
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["api_order_list"]);
      },
    }
  );
};




export const useUpdateOrder = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: any) => {
      await axiosRequest({
        url: `/orders/${id}`,
        method: "put",
        data: data,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["api_order_list"]);
      },
    }
  );
};
