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
import UserDashboard from "./Pages/UserDashboard";
import TrainerDashboard from "./Pages/TrainerDashboard";
import { tokenLoader } from "./loaders/paramsLoader";

import TrainerProfile from "./components/Trainer/TrainerProfile";

import TrainerAccount from "./components/Trainer/TrainerAccount";
import Review from "./components/User/Review";
import Upcoming from "./components/User/Upcoming";
import Browse from "./Pages/Browse";
import Cart from "./components/User/Cart";
import BookingHistory from "./components/User/BookingHistory";
import Bookings from "./components/Trainer/Bookings";
import Reviews from "./components/Trainer/Reviews";
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
        path: "/browse",
        element: <Browse />,
      },
      {
        path: "/profile",
        element: <TrainerProfile />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/admin",
        element: <AdminDashboard />,
        children: [
          {
            path: "",
            element: <ViewEnquiries />,
          },
          {
            path: "applications",
            element: <ViewApplications />,
          },
        ],
      },
      {
        path: "/user",
        element: <UserDashboard />,
        children: [
          {
            path: "",
            element: <Upcoming />,
          },
          {
            path: "review",
            element: <Review />,
          },
          {
            path: "history",
            element: <BookingHistory />,
          },
        ],
      },
      {
        path: "/trainer",
        element: <TrainerDashboard />,
        children: [
          {
            path: "",
            element: <TrainerAccount />,
          },
          {
            path: "profile",
            element: <TrainerProfile />,
          },
          {
            path: "bookings",
            element: <Bookings />,
          },
          {
            path: "reviews",
            element: <Reviews />,
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
