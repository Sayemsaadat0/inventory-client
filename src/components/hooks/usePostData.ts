import useAxios from "./useAxios";

const useUpdateData = () => {
  const axiosPost = useAxios();

  const updateData = (
    url: string,
    data: object,
    refetch: any,
    callback: (response: any) => void
  ) => {
    axiosPost
      .put(url, data)
      .then((res) => {
        console.log(res);

        // Call the callback function with the response data
        if (callback && typeof callback === "function") {
          callback(res.data); // Pass the response data to the callback
        }

        // Refetch data if needed
        if (refetch && typeof refetch === "function") {
          refetch();
        }
      })
      .catch((err) => {
        console.log("Error updating data: ", err);
      });
  };

  return updateData;
};

export default useUpdateData;
