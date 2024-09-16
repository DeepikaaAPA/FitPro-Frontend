import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LandingPage from "./Pages/LandingPage";
import Navbar from "./components/NavBar";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import AdminDashboard from "./Pages/AdminDashboard";
import Login from "./components/Login/Login";
import Logout from "./components/Login/Logout";
import Careers from "./Pages/Careers";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },

      {
        path: "Login",
        element: <Login></Login>,
      },
      {
        path: "/careers",

        element: <Careers />,
      },
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
    ],
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

  // {
  //   path: "/shorts/:code",
  //   element: <Shorts></Shorts>,
  //   loader: shortsParamsLoader,
  // },
  // {
  //   path: "/shorten",
  //   element: <UserDashboardNav />,
  //   loader: userLoader,
  //   children: [
  //     {
  //       path: "",
  //       element: <ShortenURL></ShortenURL>,
  //     },

  //     {
  //       path: "view",
  //       element: <Views></Views>,
  //     },
  //   ],
  // },
  {
    path: "/logout",
    element: <Logout />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
