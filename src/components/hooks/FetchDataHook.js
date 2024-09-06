export const useFetchData = () => {
  const fetchData = async (request) => {
    const options = {
      method: request.method || "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    if (request.body) {
      options.body = JSON.stringify(request.body);
    }
    const response = await fetch(request.url, options);
    return response;
  };

  return {
    fetchData,
  };
};
