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












export const usePostOrdersData = () => {
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
