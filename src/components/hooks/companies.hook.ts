import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosRequest from "../../lib/axiosRequest";
import { useUser } from "../context/UserProvider";

// Define the types for your data
interface Company {
  id: string;
  name: string;
}

interface PostData {
  name: string;
}

interface UpdateData {
  name: string;
}

export const useGetCompaniesData = () => {
  const { user } = useUser();
  return useQuery<Company[]>({
    queryKey: ["api_companies"],
    queryFn: () =>
      axiosRequest({
        url: `/companies/all/${user?.workspace_id}`,
        method: "get",
      }),
  });
};

export const usePostCompaniesData = () => {
  const queryClient = useQueryClient();
  return useMutation<Company, unknown, PostData>(
    (postData: PostData) =>
      axiosRequest({
        url: "/companies",
        method: "post",
        data: postData,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(["api_companies"]),
    }
  );
};

export const useUpdateCompany = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<Company, unknown, UpdateData>(
    async (data: UpdateData) => {
      const response = await axiosRequest({
        url: `/companies/${id}`,
        method: "put",
        data: data,
      });
      return response; // Ensure the response is a Company object
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["api_companies"]);
      },
    }
  );
};

export const useDeleteCompany = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, void>(
    async () => {
      await axiosRequest({
        url: `/companies/${id}`,
        method: "delete",
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["api_companies"]);
      },
    }
  );
};
