import { useLoaderData } from "react-router-dom";

import { useEffect, useState } from "react";
import instance from "../../services/instance";
function ActivateAccount() {
  const token = useLoaderData();
  const [message, setMessage] = useState("Activating...");
  useEffect(() => {
    instance
      .get(`/auth/activate/${token}`)
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) =>
        setMessage(error?.response?.data?.message || "Network error")
      );
  }, []);
  return (
    <>
      <br></br>
      {message}
      <br></br>
    </>
  );
}

export default ActivateAccount;
