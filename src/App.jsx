import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LandingPage from "./Pages/LandingPage";
import Navbar from "./components/NavBar";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import AdminDashboard from "./Pages/AdminDashboard";
import ActivateAccount from "./components/Login/ActivateAccount";
import Login from "./components/Login/Login";
import Logout from "./components/Login/Logout";
import Careers from "./Pages/Careers";
import userLoader from "./loaders/userLoader";
import ViewEnquiries from "./components/Admin/ViewEnquiries";
import ViewApplications from "./components/Admin/ViewApplications";
import Register from "./components/Login/Register";
import { tokenLoader } from "./loaders/paramsLoader";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    loader: userLoader,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "/careers",

        element: <Careers />,
      },
      {
        path: "/admin",
        element: <AdminDashboard />,
        children: [
          {
            path: "enquiries",
            element: <ViewEnquiries />,
          },
          {
            path: "applications",
            element: <ViewApplications />,
          },
        ],
      },
    ],
  },
  {
    path: "logout",
    element: <Logout></Logout>,
  },
  {
    path: "login",
    element: <Login></Login>,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "/activate/:token",

    element: <ActivateAccount />,
    loader: tokenLoader,
  },
  // {
  //   path: "/forgot-password",

  //   element: <ForgotPassword />,
  // },
  // {
  //   path: "/reset",

  //   element: <VerifyResetPassword />,
  // },
  // {
  //   path: "/reset/:token",

  //   element: <VerifyResetLink />,
  //   loader: tokenLoader,
  // },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
