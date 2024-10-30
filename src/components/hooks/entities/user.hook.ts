import { useMutation, useQuery, useQueryClient } from "react-query";
import { useUser } from "../../context/UserProvider";
import axiosRequest from "../../../lib/axiosRequest";






export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (postData: any) =>
      axiosRequest({
        url: "/users",
        method: "post",
        data: postData,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(["api_users"]),
    }
  );
};








export const useGetUsers = () => {
  const { user } = useUser();
  return useQuery({
    queryKey: [`api_users`],
    queryFn: () =>
      axiosRequest({
        url: `/users/all/${user?.workspace_id}`,
        method: "get",
      }),
  });
};




export const useDeleteUser = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      await axiosRequest({
        url: `/users/${id}`,
        method: "delete",
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["api_users"]);
      },
    }
  );
};










export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: any) => {
      await axiosRequest({
        url: `/users/${id}`,
        method: "PATCH",
        data: data,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["api_users"]);
      },
    }
  );
};
