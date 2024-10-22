import { useMutation, useQuery, useQueryClient } from "react-query";
import { useUser } from "../../context/UserProvider";
import axiosRequest from "../../../lib/axiosRequest";


export const useGetCustomersData = () => {
  const { user } = useUser();
  return useQuery({
    queryKey: [`api_customers`],
    queryFn: () =>
      axiosRequest({
        url: `/customers/all/${user?.workspace_id}`,
        method: "get",
      }),
  });
};

export const usePostCustomersData = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (postData: any) =>
      axiosRequest({
        url: "/customers",
        method: "post",
        data: postData,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(["api_customers"]),
    }
  );
};

export const useUpdateCustomer = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: any) => {
      await axiosRequest({
        url: `/customers/${id}`,
        method: "put",
        data: data,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["api_customers"]);
      },
    }
  );
};

export const useDeleteCustomer = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      await axiosRequest({
        url: `/customers/${id}`,
        method: "delete",
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["api_customers"]);
      },
    }
  );
};
