import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthUserContext";
import { Link, useLocation } from "wouter";
import { getAllUsers } from "../../services/userServices";
import { UserCard } from "../UserCard/UserCard";

export const Sidebar = ({ position }) => {
  const { user, setUser } = useAuth();
  const [location, setLocation] = useLocation();
  const [userList, setUserList] = useState([]);
  const full_name = user.first_name + " " + user.last_name;
  const [currentSelectedDetail, setCurrentSelectedDetail] = useState("");

  const logOut = () => {
    setUser("");
    localStorage.removeItem("currentUser");
    setLocation("/welcome");
  };

  const fetchApi = async () => {
    const response = await getAllUsers(user.id);
    setUserList(response);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  if (position === "right") {
    return (
      <section className="hidden sm:flex flex-col fixed top-32 right-20 gap-2 bg-white border border-gray-200 p-4">
        <p className="text-gray-500">
          ¡Seguí a otros usuarios para ver más contenido!
        </p>
        {userList.slice(0, 3).map((u) => (
          <UserCard key={u.id} u={u} />
        ))}
      </section>
    );
  }

  return (
    <section className="hidden fixed left-0 h-full w-[26rem] bg-white border-r border-gray-200  sm:flex flex-col justify-between p-6 z-50">
      <section className="flex flex-col gap-6">
        <h2 className="text-3xl font-extrabold text-blue-700 tracking-wide select-none">
          Conecta
        </h2>
        <ul className="flex flex-col gap-5">
          <li
            className={`flex items-center gap-3 text-lg font-medium px-3 py-2 cursor-pointer transition 
          ${
            location === "/home"
              ? "bg-blue-100 text-blue-700 font-semibold"
              : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          }`}
          >
            <ion-icon
              name={location === "/home" ? "home" : "home-outline"}
              className="text-xl"
            ></ion-icon>
            <Link
              to="/home"
              className="w-full"
              onClick={() => setCurrentSelectedDetail("")}
            >
              Inicio
            </Link>
          </li>

          {user && (
            <li
              className={`flex relative items-center gap-3 text-lg font-medium px-3 py-2 cursor-pointer transition 
          ${
            location === `/profile/${user.id}`
              ? "bg-blue-100 text-blue-700 font-semibold"
              : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          }`}
            >
              <section className="w-full">
                <div className="absolute top-5">
                  <ion-icon
                    name={
                      location === `/profile/${user.id}`
                        ? "person"
                        : "person-outline"
                    }
                    className="text-xl"
                  ></ion-icon>
                </div>
                <details className="group [&_summary::-webkit-details-marker]:hidden w-full">
                  <summary className="ml-3 flex cursor-pointer items-center justify-between rounded-lg px-4 py-2">
                    <span className="text-lg font-medium">Cuenta</span>

                    <span className="shrink-0 transition duration-300 group-open:-rotate-180 absolute right-54">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <ul className="mt-2 space-y-1 px-4">
                    <li
                      className={`${
                        currentSelectedDetail === "account" ? "text-black" : ""
                      }`}
                    >
                      <Link
                        to={`/profile/${user.id}`}
                        onClick={() => setCurrentSelectedDetail("account")}
                        className="block rounded-lg px-4 py-2 text-sm font-medium hover:text-black"
                      >
                        Ver perfil
                      </Link>
                    </li>

                    <li>
                      <p
                        onClick={logOut}
                        className="w-full rounded-lg px-4 py-2 [text-align:_inherit] text-sm font-medium hover:text-black"
                      >
                        Cerrar sesion
                      </p>
                    </li>
                  </ul>
                </details>
              </section>
            </li>
          )}

          <li
            className={`flex items-center gap-3 text-lg font-medium px-3 py-2 cursor-pointer transition 
          ${
            location === "/explore"
              ? "bg-blue-100 text-blue-700 font-semibold"
              : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          }`}
          >
            <ion-icon name="search-outline"></ion-icon>
            <Link
              to="/explore"
              className="w-full"
              onClick={() => setCurrentSelectedDetail("")}
            >
              Explorar
            </Link>
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-5">
        {user ? (
          <section className="w-full bg-white p-4 hover:bg-gray-50">
            <section className="flex items-center gap-4 ">
              <img
                src="https://www.researchgate.net/profile/Maria-Monreal/publication/315108532/figure/fig1/AS:472492935520261@1489662502634/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png"
                alt="Avatar"
                className="size-14 rounded-full object-cover"
              />

              <section>
                <p className="text-base">
                  <strong className="block font-medium">{full_name}</strong>

                  <span>{user.email}</span>
                </p>
              </section>
            </section>
          </section>
        ) : (
          <section>
            <Link
              to="/login"
              className="cursor-pointer hidden sm:flex items-center justify-center gap-2 h-10 bg-blue-600 text-white hover:bg-blue-700 font-semibold transition w-80 text-lg"
            >
              Iniciar Sesion
            </Link>
          </section>
        )}
      </section>
    </section>
  );
};
