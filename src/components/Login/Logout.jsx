import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import instance from "../../services/instance";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // perform the logout
    instance
      .post("/auth/logout")
      .then((response) => {
        alert(response.data.message);

        // redirect to the login page
        setTimeout(() => {
          navigate("/login");
        }, 500);
      })
      .catch((error) => {
        alert(error?.response?.data?.message);

        // redirect to the login page
        setTimeout(() => {
          navigate("/login");
        }, 500);
      });
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
