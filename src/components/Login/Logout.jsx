import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import instance from "../../services/instance";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/userSlice";
const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // perform the logout
    // instance
    //   .post("/auth/logout")
    //   .then((response) => {
    //     dispatch(logout());
    //     // redirect to the login page
    //     setTimeout(() => {
    //       navigate("/");
    //     }, 500);
    //   })
    //   .catch((error) => {
    //     alert(error?.response?.data?.message);

    //     // redirect to the login page
    //     setTimeout(() => {
    //       navigate("/login");
    //     }, 500);
    //   });
    localStorage.setItem("token", "");
    navigate("/login");
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
