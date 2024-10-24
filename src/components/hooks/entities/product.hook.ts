import { useMutation, useQuery, useQueryClient } from "react-query";
import { useUser } from "../../context/UserProvider";
import axiosRequest from "../../../lib/axiosRequest";


export const useGetproductsData = () => {
  const { user } = useUser();
  return useQuery({
    queryKey: [`all_items`],
    queryFn: () =>
      axiosRequest({
        url: `/products/all/${user?.workspace_id}`,
        method: "get",
      }),
  });
};

export const usePostproductsData = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (postData: any) =>
      axiosRequest({
        url: "/products",
        method: "post",
        data: postData,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(["all_items"]),
    }
  );
};

export const useUpdateproduct = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: any) => {
      await axiosRequest({
        url: `/products/${id}`,
        method: "put",
        data: data,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["all_items"]);
      },
    }
  );
};

export const useDeleteproduct = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      await axiosRequest({
        url: `/products/${id}`,
        method: "delete",
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["all_items"]);
      },
    }
  );
};
