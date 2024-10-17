import { useMutation, useQueryClient } from "react-query";
import axiosRequest from "../../../lib/axiosRequest";

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
