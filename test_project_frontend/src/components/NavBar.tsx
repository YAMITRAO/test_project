import { useContext, useState } from "react";
import { FaWallet } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa";
import UserContext from "../context/user_context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axiosInt from "../helper/ApiInstance";
import { toast } from "react-toastify";

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [isAppsVisible, setIsAppsVisible] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  // fun to close all pop on clicking navbar anywhere
  const handelPopUpClose = () => {
    console.log("IS Clicked");
    if (isAppsVisible || isNotificationVisible || isProfileVisible) {
      setIsAppsVisible(false);
      setIsProfileVisible(false);
      setIsNotificationVisible(false);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT_USER",
    });
    navigate("/login");
  };

  // buy preium handler
  const buyPremiumHandler = async () => {
    console.log("but preium clicked...");
    alert("Do you want to be a premium user ?");
    try {
      await axiosInt.put(
        "/user/buypremium",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("You are now a premium user");
      navigate("/");
    } catch (error) {
      console.log("Error is :- ", error);
    }
  };
  return (
    <div>
      <header className="antialiased" onClick={handelPopUpClose}>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center">
            {/* left side content  */}
            <div className="flex justify-start items-center">
              {/* sidebar sliding button */}
              <button
                id="toggleSidebar"
                aria-expanded="true"
                aria-controls="sidebar"
                className="hidden p-2 mr-3 text-gray-600 rounded cursor-pointer lg:inline hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  {" "}
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h14M1 6h14M1 11h7"
                  />{" "}
                </svg>
              </button>

              <button
                aria-expanded="true"
                aria-controls="sidebar"
                className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <svg
                  className="w-[18px] h-[18px]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
                <span className="sr-only">Toggle sidebar</span>
              </button>

              {/* logo with name */}
              <Link to="/" className="flex mr-4  items-center gap-4">
                <span className="text-[28px] text-[#1c9ab4]">
                  <FaWallet />
                </span>
                {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Expense App
                </span> */}
              </Link>

              {/* search bar */}
              <form action="#" method="GET" className="hidden lg:block lg:pl-2">
                <label htmlFor="topbar-search" className="sr-only">
                  Search
                </label>
                <div className="relative mt-1 lg:w-96">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      {" "}
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />{" "}
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="email"
                    id="topbar-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-9 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search"
                  />
                </div>
              </form>
            </div>

            {/* right side content */}
            {state.isProUser
              ? state.isAuth && (
                  <div className="flex items-center lg:order-2 ">
                    {/* small search button for mobile view */}
                    <button
                      id="toggleSidebarMobileSearch"
                      type="button"
                      className="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Search</span>

                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </button>

                    {/* notification button */}
                    <button
                      type="button"
                      data-dropdown-toggle="notification-dropdown"
                      className="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                      onClick={(event) => {
                        event.stopPropagation();
                        console.log("Clicked.....");
                        setIsNotificationVisible((prev) => !prev);
                        setIsAppsVisible(false);
                        setIsProfileVisible(false);
                      }}
                    >
                      <span className="sr-only">View notifications</span>

                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 14 20"
                      >
                        <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
                      </svg>
                    </button>

                    {/* notification div */}
                    {isNotificationVisible && (
                      <div
                        className="fixed top-[42px] lg:top-[52px] right-[2px] overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700"
                        id="notification-dropdown"
                      >
                        <div className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          Notifications
                        </div>
                        <div>
                          <a
                            href="#"
                            className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                          >
                            <div className="flex-shrink-0">
                              <img
                                className="w-11 h-11 rounded-full"
                                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                                alt="Bonnie Green avatar"
                              />
                              <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 dark:border-gray-700">
                                <svg
                                  className="w-2 h-2 text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 18 18"
                                >
                                  <path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z" />
                                  <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                                </svg>
                              </div>
                            </div>
                            <div className="pl-3 w-full">
                              <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                New message from{" "}
                                <span className="font-semibold text-gray-900 dark:text-white">
                                  Bonnie Green
                                </span>
                                : "Hey, what's up? All set for the
                                presentation?"
                              </div>
                              <div className="text-xs font-medium text-primary-700 dark:text-primary-400">
                                a few moments ago
                              </div>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                          >
                            <div className="flex-shrink-0">
                              <img
                                className="w-11 h-11 rounded-full"
                                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                                alt="Jese Leos avatar"
                              />
                              <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-gray-900 rounded-full border border-white dark:border-gray-700">
                                <svg
                                  className="w-2 h-2 text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 20 18"
                                >
                                  <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                                </svg>
                              </div>
                            </div>
                            <div className="pl-3 w-full">
                              <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                <span className="font-semibold text-gray-900 dark:text-white">
                                  Jese leos
                                </span>{" "}
                                and{" "}
                                <span className="font-medium text-gray-900 dark:text-white">
                                  5 others
                                </span>{" "}
                                started following you.
                              </div>
                              <div className="text-xs font-medium text-primary-700 dark:text-primary-400">
                                10 minutes ago
                              </div>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                          >
                            <div className="flex-shrink-0">
                              <img
                                className="w-11 h-11 rounded-full"
                                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
                                alt="Joseph McFall avatar"
                              />
                              <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-red-600 rounded-full border border-white dark:border-gray-700">
                                <svg
                                  className="w-2 h-2 text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 20 18"
                                >
                                  {" "}
                                  <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />{" "}
                                </svg>
                              </div>
                            </div>
                            <div className="pl-3 w-full">
                              <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                <span className="font-semibold text-gray-900 dark:text-white">
                                  Joseph Mcfall
                                </span>{" "}
                                and{" "}
                                <span className="font-medium text-gray-900 dark:text-white">
                                  141 others
                                </span>{" "}
                                love your story. See it and view more stories.
                              </div>
                              <div className="text-xs font-medium text-primary-700 dark:text-primary-400">
                                44 minutes ago
                              </div>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                          >
                            <div className="flex-shrink-0">
                              <img
                                className="w-11 h-11 rounded-full"
                                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
                                alt="Roberta Casas image"
                              />
                              <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-green-400 rounded-full border border-white dark:border-gray-700">
                                <svg
                                  className="w-2 h-2 text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 20 18"
                                >
                                  <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                                </svg>
                              </div>
                            </div>
                            <div className="pl-3 w-full">
                              <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                <span className="font-semibold text-gray-900 dark:text-white">
                                  Leslie Livingston
                                </span>{" "}
                                mentioned you in a comment:{" "}
                                <span className="font-medium text-primary-700 dark:text-primary-500">
                                  @bonnie.green
                                </span>{" "}
                                what do you say?
                              </div>
                              <div className="text-xs font-medium text-primary-700 dark:text-primary-400">
                                1 hour ago
                              </div>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-600"
                          >
                            <div className="flex-shrink-0">
                              <img
                                className="w-11 h-11 rounded-full"
                                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/robert-brown.png"
                                alt="Robert image"
                              />
                              <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-purple-500 rounded-full border border-white dark:border-gray-700">
                                <svg
                                  className="w-2 h-2 text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 20 14"
                                >
                                  <path d="M11 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm8.585 1.189a.994.994 0 0 0-.9-.138l-2.965.983a1 1 0 0 0-.685.949v8a1 1 0 0 0 .675.946l2.965 1.02a1.013 1.013 0 0 0 1.032-.242A1 1 0 0 0 20 12V2a1 1 0 0 0-.415-.811Z" />
                                </svg>
                              </div>
                            </div>
                            <div className="pl-3 w-full">
                              <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                <span className="font-semibold text-gray-900 dark:text-white">
                                  Robert Brown
                                </span>{" "}
                                posted a new video: Glassmorphism - learn how to
                                implement the new design trend.
                              </div>
                              <div className="text-xs font-medium text-primary-700 dark:text-primary-400">
                                3 hours ago
                              </div>
                            </div>
                          </a>
                        </div>
                        <a
                          href="#"
                          className="block py-2 text-base font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline"
                        >
                          <div className="inline-flex items-center ">
                            <svg
                              aria-hidden="true"
                              className="mr-2 w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                              <path
                                fillRule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            View all
                          </div>
                        </a>
                      </div>
                    )}

                    {/* apps button */}
                    <button
                      type="button"
                      data-dropdown-toggle="apps-dropdown"
                      className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                      onClick={(event) => {
                        setIsAppsVisible((prev) => !prev);
                        setIsNotificationVisible(false);
                        setIsProfileVisible(false);
                        event.stopPropagation();
                      }}
                    >
                      <span className="sr-only">View notifications</span>

                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 18"
                      >
                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                      </svg>
                    </button>

                    {/* all apps div */}
                    {isAppsVisible && (
                      <div
                        className="fixed top-[42px] lg:top-[52px] right-[2px] overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:bg-gray-700 dark:divide-gray-600"
                        id="apps-dropdown"
                      >
                        <div className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          Apps
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-4">
                          <Link
                            to="/profile"
                            className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                          >
                            <svg
                              className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              Profile
                            </div>
                          </Link>
                          <a
                            href="#"
                            className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                          >
                            <svg
                              className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                            </svg>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              Settings
                            </div>
                          </a>

                          <Link
                            to="#"
                            className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                            onClick={logoutHandler}
                          >
                            <svg
                              className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 16 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
                              />
                            </svg>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              Logout
                            </div>
                          </Link>
                        </div>
                      </div>
                    )}

                    {/*profile button  */}
                    <button
                      type="button"
                      className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                      id="user-menu-button"
                      aria-expanded="false"
                      data-dropdown-toggle="dropdown"
                      onClick={(event) => {
                        event.stopPropagation();
                        setIsProfileVisible((prev) => !prev);
                        setIsAppsVisible(false);
                        setIsNotificationVisible(false);
                      }}
                    >
                      <span className="sr-only">Open user menu</span>
                      <span className="text-[20px] rounded-full bg-slate-400 p-1 text-[#78290f]">
                        <FaUserAstronaut />
                      </span>
                    </button>

                    {isProfileVisible && (
                      <div
                        className="fixed top-[42px] lg:top-[52px] right-[2px] z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                        id="dropdown"
                      >
                        <div className="py-3 px-4">
                          <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                            {state.userName}
                          </span>
                          <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                            {state.userEmail}
                          </span>
                        </div>
                        <ul
                          className="py-1 text-gray-500 dark:text-gray-400"
                          aria-labelledby="dropdown"
                        >
                          <li>
                            <Link
                              to="/profile"
                              className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                            >
                              My profile
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                            >
                              Account settings
                            </Link>
                          </li>
                        </ul>
                        {/* <ul
                    className="py-1 text-gray-500 dark:text-gray-400"
                    aria-labelledby="dropdown"
                  >
                    <li>
                      <a
                        href="#"
                        className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <svg
                          className="mr-2 w-4 h-4 text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18"
                        >
                          <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                        </svg>
                        My likes
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <svg
                          className="mr-2 w-4 h-4 text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          {" "}
                          <path d="m1.56 6.245 8 3.924a1 1 0 0 0 .88 0l8-3.924a1 1 0 0 0 0-1.8l-8-3.925a1 1 0 0 0-.88 0l-8 3.925a1 1 0 0 0 0 1.8Z" />{" "}
                          <path d="M18 8.376a1 1 0 0 0-1 1v.163l-7 3.434-7-3.434v-.163a1 1 0 0 0-2 0v.786a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.786a1 1 0 0 0-1-1Z" />{" "}
                          <path d="M17.993 13.191a1 1 0 0 0-1 1v.163l-7 3.435-7-3.435v-.163a1 1 0 1 0-2 0v.787a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.787a1 1 0 0 0-1-1Z" />{" "}
                        </svg>
                        Collections
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex justify-between items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <span className="flex items-center">
                          <svg
                            className="mr-2 w-4 h-4 text-primary-600 dark:text-primary-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="m7.164 3.805-4.475.38L.327 6.546a1.114 1.114 0 0 0 .63 1.89l3.2.375 3.007-5.006ZM11.092 15.9l.472 3.14a1.114 1.114 0 0 0 1.89.63l2.36-2.362.38-4.475-5.102 3.067Zm8.617-14.283A1.613 1.613 0 0 0 18.383.291c-1.913-.33-5.811-.736-7.556 1.01-1.98 1.98-6.172 9.491-7.477 11.869a1.1 1.1 0 0 0 .193 1.316l.986.985.985.986a1.1 1.1 0 0 0 1.316.193c2.378-1.3 9.889-5.5 11.869-7.477 1.746-1.745 1.34-5.643 1.01-7.556Zm-3.873 6.268a2.63 2.63 0 1 1-3.72-3.72 2.63 2.63 0 0 1 3.72 3.72Z" />
                          </svg>
                          Pro version
                        </span>
                        <svg
                          className="w-2.5 h-2.5 text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul> */}
                        <ul
                          className="py-1 text-gray-500 dark:text-gray-400"
                          aria-labelledby="dropdown"
                        >
                          <li>
                            <button
                              className="w-full text-red-500 block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              onClick={logoutHandler}
                            >
                              Sign out
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                )
              : state.isAuth && (
                  <div>
                    <button
                      className=" p-1 px-2 rounded-md text-slate-100 font-medium bg-green-600 mr-4"
                      onClick={buyPremiumHandler}
                    >
                      {" "}
                      Buy Premium
                    </button>
                    <button
                      className=" p-1 px-2 rounded-md text-slate-100 font-medium bg-red-700 hover:bg-red-800 transition-all"
                      onClick={logoutHandler}
                    >
                      {" "}
                      Logout
                    </button>
                  </div>
                )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
