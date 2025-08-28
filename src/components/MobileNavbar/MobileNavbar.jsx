import { CreatePostModal } from "../Modals/CreatePostModal";
import { Link, useLocation } from "wouter";
import { useAuth } from "../../context/AuthUserContext";
import { useState } from "react";

export const MobileNavbar = () => {
  const [location, setLocation] = useLocation();
  const { user, setUser } = useAuth();
  const [isModalActive, setIsModalActive] = useState(false);
  return (
    <>
      <nav className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-2 left-1/2 dark:bg-gray-700 dark:border-gray-600 sm:hidden">
        <ul className="flex items-center justify-between h-full w-full pl-8 pr-8">
          <li>
            <Link
              data-tooltip-target="tooltip-home"
              to="/"
              className={`inline-flex flex-col items-center justify-center rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group text-2xl ${
                location === "/" ? "text-blue-600" : "text-gray-600 "
              }`}
            >
              <ion-icon
                name={location === "/" ? "home" : "home-outline"}
              ></ion-icon>
            </Link>
          </li>
          <li>
            <Link
              data-tooltip-target="tooltip-home"
              to="/explore"
              className={`inline-flex flex-col items-center justify-center rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group text-2xl ${
                location === "/explore" ? "text-blue-600" : "text-gray-600 "
              }`}
            >
              <ion-icon
                name={location === "/explore" ? "search" : "search-outline"}
              ></ion-icon>
            </Link>
          </li>
          <li>
            <div className="flex items-center justify-center">
              <button
                data-tooltip-target="tooltip-new"
                onClick={() => setIsModalActive(!isModalActive)}
                className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
                <span className="sr-only">New item</span>
              </button>
            </div>
          </li>
          <li>
            <Link
              data-tooltip-target="tooltip-home"
              to={`/user/${user?.username}`}
              className={`inline-flex flex-col items-center justify-center rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group text-2xl ${
                location === `/user/${user?.username}`
                  ? "text-blue-600"
                  : "text-gray-600 "
              }`}
            >
              <ion-icon
                name={
                  location === `/user/${user.username}`
                    ? "person"
                    : "person-outline"
                }
              ></ion-icon>
            </Link>
          </li>
          <li
            onClick={() => {
              setUser(null);
              setLocation("/welcome");
            }}
            className="inline-flex flex-col items-center justify-cente rounded-s-full group text-2xl text-gray-600"
          >
            <ion-icon name="log-out-outline"></ion-icon>
          </li>
        </ul>
      </nav>
      <CreatePostModal
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
      />
    </>
  );
};
