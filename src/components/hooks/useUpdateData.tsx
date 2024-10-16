import useAxios from "./useAxios";

type UpdateDataFunction = (
  url: string,
  data: Record<string, any>,
  refetch?: Function,
  callback?: (response: any) => void
) => void;

const useUpdateData = (): UpdateDataFunction => {
  const axiosPut = useAxios();

  const updateData: UpdateDataFunction = (url, data, refetch, callback) => {
    axiosPut
      .put(url, data)
      .then((res) => {
        // Call the refetch function if provided
        if (refetch && typeof refetch === "function") {
          refetch();
        }

        // Call the callback function if provided
        if (callback && typeof callback === "function") {
          callback(res.data); // Pass the response data to the callback
        }

        console.log(res);
      })
      .catch((err) => {
        console.log("Error updating data: ", err);
      });
  };

  return updateData;
};

export default useUpdateData;
