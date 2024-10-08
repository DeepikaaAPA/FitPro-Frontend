import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import logo from "./images/logo.png";
import { Link, Outlet, useLoaderData } from "react-router-dom";

export default function Navbar(props) {
  const dispatch = useDispatch();

  const user = useLoaderData();
  const [navbarOpen, setNavbarOpen] = useState(false);

  const [loggedInUser, setLoggedInUser] = useState("");
  useEffect(() => {
    if (user) {
      setLoggedInUser(user);
    }
  }, [user]);

  user && dispatch(login({ userId: user._id, ...user }));
  return (
    <>
      <nav
        className={
          (props.transparent
            ? "top-0  text-white  fixed z-50 w-full "
            : "sticky top-0  text-white bg-gray-900 z-50 fixed shadow-lg") +
          " flex flex-wrap items-center justify-between px-2 "
        }
      >
        <div className="container  px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className={
                (props.transparent ? "text-white" : "text-white-800") +
                " text-sm font-bold leading-relaxed inline-block mr-4  whitespace-nowrap capitalize"
              }
            >
              <img
                src={logo}
                className=" h-12 w-50 md:h-20 object-contain"
              ></img>
            </a>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i
                className={
                  (props.transparent ? "text-white" : "text-white-800") +
                  " fas fa-bars"
                }
              ></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-gray-700 lg:bg-transparent lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center  mr-2 ">
                <Link
                  to={"/browse"}
                  className={
                    (props.transparent
                      ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                      : "text-white-800 hover:text-white -600") +
                    " px-3 py-4 lg:py-2 flex items-center text-xs capitalize font-bold hover:text-lg"
                  }
                >
                  <i className=" fa fa-search text-lg leading-lg " />
                  <span className="   inline-block ml-2">Browse classes</span>
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to={"/"}
                  className={
                    (props.transparent
                      ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                      : "text-white-800 hover:text-white -600") +
                    " px-3 py-4 lg:py-2 flex items-center text-xs capitalize font-bold hover:text-lg"
                  }
                >
                  <i className=" fa fa-home text-lg leading-lg " />
                  <span className=" inline-block ml-2">Home</span>
                </Link>
              </li>
              {loggedInUser && (
                <li className="flex items-center">
                  <Link
                    to={loggedInUser.role !== "admin" ? "/user" : "/admin"}
                    className={
                      (props.transparent
                        ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                        : "text-white-800 hover:text-gray-600") +
                      " px-3 py-4 lg:py-2 flex items-center text-xs capitalize font-bold hover:text-lg"
                    }
                  >
                    <i
                      className={
                        (props.transparent
                          ? "lg:text-gray-300 text-gray-500 "
                          : "text-white-500 hover:text-lg") +
                        " fa fa-person text-lg leading-lg  hover:text-lg"
                      }
                    />
                    <span className=" inline-block ml-2">
                      {"Welcome "}
                      {user.firstname}
                      {"!"}
                    </span>
                  </Link>
                </li>
              )}

              {loggedInUser.role === "trainer" && (
                <li className="flex items-center">
                  <Link
                    to={"/trainer"}
                    className={
                      (props.transparent
                        ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                        : "text-white-800 hover:text-lg") +
                      " px-3 py-4 lg:py-2 flex items-center text-xs capitalize font-bold hover:text-lg"
                    }
                  >
                    <i
                      className={
                        (props.transparent
                          ? "lg:text-gray-300 text-gray-500"
                          : "text-white-500") +
                        " fa fa-user-tie text-lg leading-lg "
                      }
                    />
                    <span className=" inline-block ml-2">Trainer Account</span>
                  </Link>
                </li>
              )}
              {!loggedInUser && (
                <li className="flex items-center">
                  <Link
                    to={"/login"}
                    className={
                      (props.transparent
                        ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                        : "text-white-800 ") +
                      " px-3 py-4 lg:py-2 flex items-center text-xs capitalize font-bold hover:text-lg"
                    }
                  >
                    <i
                      className={
                        (props.transparent
                          ? "lg:text-gray-300 text-gray-500"
                          : "text-white-500") +
                        " fa fa-sign-in text-lg leading-lg "
                      }
                    />
                    <span className=" inline-block ml-2"> Login</span>
                  </Link>
                </li>
              )}
              <li className="flex items-center">
                <Link
                  className={
                    (props.transparent
                      ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                      : "text-white-800 hover:text-gray-600") +
                    " px-3 py-4 lg:py-2 flex items-center text-xs capitalize font-bold hover:text-lg"
                  }
                  to="/careers"
                >
                  <i
                    className={
                      (props.transparent
                        ? "lg:text-gray-300 text-gray-500"
                        : "text-white-500") +
                      " fa fa-briefcase text-lg leading-lg "
                    }
                  />
                  <span className=" inline-block ml-2">Careers</span>
                </Link>
              </li>
              <li className="flex items-center  mr-2 ">
                <Link
                  to={"/cart"}
                  className={
                    (props.transparent
                      ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                      : "text-white-800 hover:text-white -600") +
                    " px-3 py-4 lg:py-2 flex items-center text-xs capitalize font-bold hover:text-lg"
                  }
                >
                  <i className=" fa fa-shopping-cart text-lg leading-lg " />
                  <span className="   inline-block ml-2">Cart</span>
                </Link>
              </li>
              {loggedInUser && (
                <li className="flex items-center">
                  <Link
                    to="/logout"
                    className={
                      (props.transparent
                        ? "bg-white text-gray-800 active:bg-gray-100"
                        : "bg-blue-500 text-white active:bg-gray-200") +
                      " text-xs font-bold capitalize px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
                    }
                    type="button"
                    style={{ transition: "all .15s ease" }}
                  >
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet></Outlet>
    </>
  );
}
