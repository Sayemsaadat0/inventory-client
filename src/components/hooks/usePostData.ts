import useAxios from "./useAxios";

const usePostData = () => {
  const axiosPost = useAxios();

  const postData = (url: string, data: object, refetch: any, callback: any) => {
    axiosPost
      .post(url, data)
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
        console.log("error to add", err);
      });
  };

  return postData;
};

export default usePostData;
