import { useMutation, useQuery, useQueryClient } from "react-query";
import { useUser } from "../../context/UserProvider";
import axiosRequest from "../../../lib/axiosRequest";


export const useGetPaymentTypeData = () => {
  const { user } = useUser();
  return useQuery({
    queryKey: [`api_payment_type`],
    queryFn: () =>
      axiosRequest({
        url: `/payment-type/all/${user?.workspace_id}`,
        method: "get",
      }),
  });
};

export const usePostPaymentTypeData = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (postData: any) =>
      axiosRequest({
        url: "/payment-type",
        method: "post",
        data: postData,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(["api_payment_type"]),
    }
  );
};

export const useUpdatePaymentType = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: any) => {
      await axiosRequest({
        url: `/payment-type/${id}`,
        method: "put",
        data: data,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["api_payment_type"]);
      },
    }
  );
};

export const useDeletePaymentType = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      await axiosRequest({
        url: `/payment-type/${id}`,
        method: "delete",
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["api_payment_type"]);
      },
    }
  );
};
