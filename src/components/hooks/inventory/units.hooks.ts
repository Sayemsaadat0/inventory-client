import { useMutation, useQuery, useQueryClient } from "react-query";
import { useUser } from "../../context/UserProvider";
import axiosRequest from "../../../lib/axiosRequest";


export const useGetUnitsData = () => {
  const { user } = useUser();
  return useQuery({
    queryKey: [`api_unit_lists`],
    queryFn: () =>
      axiosRequest({
        url: `/units/all/${user?.workspace_id}`,
        method: "get",
      }),
  });
};

export const usePostUnitsData = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (postData: any) =>
      axiosRequest({
        url: "/units",
        method: "post",
        data: postData,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(["api_unit_lists"]),
    }
  );
};

export const useUpdateUnit = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: any) => {
      await axiosRequest({
        url: `/units/${id}`,
        method: "put",
        data: data,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["api_unit_lists"]);
      },
    }
  );
};

export const useDeleteUnit = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      await axiosRequest({
        url: `/units/${id}`,
        method: "delete",
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["api_unit_lists"]);
      },
    }
  );
};
