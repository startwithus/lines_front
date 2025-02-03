export const getCaller = async (url) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: `${localStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
  return response;
};
