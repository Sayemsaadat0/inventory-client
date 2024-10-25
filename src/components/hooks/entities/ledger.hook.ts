import { useMutation, useQuery, useQueryClient } from "react-query";
import { useUser } from "../../context/UserProvider";
import axiosRequest from "../../../lib/axiosRequest";


export const useGetledgersData = () => {
  const { user } = useUser();
  return useQuery({
    queryKey: [`api_ledgers`],
    queryFn: () =>
      axiosRequest({
        url: `/ledgers/all/${user?.workspace_id}`,
        method: "get",
      }),
  });
};

export const usePostledgersData = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (postData: any) =>
      axiosRequest({
        url: "/ledgers",
        method: "post",
        data: postData,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(["api_ledgers"]),
    }
  );
};

export const useUpdateLedger = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: any) => {
      await axiosRequest({
        url: `/ledgers/${id}`,
        method: "put",
        data: data,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["api_ledgers"]);
      },
    }
  );
};

export const useDeleteLedger = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      await axiosRequest({
        url: `/ledgers/${id}`,
        method: "delete",
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["api_ledgers"]);
      },
    }
  );
};
