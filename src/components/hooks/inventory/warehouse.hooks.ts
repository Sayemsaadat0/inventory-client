import { useMutation, useQuery, useQueryClient } from "react-query";
import { useUser } from "../../context/UserProvider";
import axiosRequest from "../../../lib/axiosRequest";


export const useGetWarehouseData = () => {
  const { user } = useUser();
  return useQuery({
    queryKey: [`api_warehouse`],
    queryFn: () =>
      axiosRequest({
        url: `/warehouses/all/${user?.workspace_id}`,
        method: "get",
      }),
  });
};

export const usePostWarehousesData = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (postData: any) =>
      axiosRequest({
        url: "/warehouses",
        method: "post",
        data: postData,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(["api_warehouse"]),
    }
  );
};

export const useUpdateWarehouse = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: any) => {
      await axiosRequest({
        url: `/warehouses/${id}`,
        method: "put",
        data: data,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["api_warehouse"]);
      },
    }
  );
};

export const useDeleteWarehouse = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      await axiosRequest({
        url: `/warehouses/${id}`,
        method: "delete",
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["api_warehouse"]);
      },
    }
  );
};
