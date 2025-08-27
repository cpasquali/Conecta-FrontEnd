import { Link } from "wouter";
import {
  addFollower,
  removeFollower,
  getUserFollowing,
} from "../../services/userServices";
import { useAuth } from "../../context/AuthUserContext";
import { notify } from "../../utils/notify";
import { useEffect, useState } from "react";

export const UserCard = ({ u }) => {
  const fullName = u.first_name + " " + u.last_name;
  const { user } = useAuth();
  const [userFollowing, setUserFollowing] = useState([]);

  const toggleFollowUser = async () => {
    if (userFollowing.some((f) => f.id_user_following === u.id)) {
      const response = await removeFollower(u.id, user.id);
      notify(response.message, "success");
      setUserFollowing((prevFollowingList) =>
        prevFollowingList.filter((f) => f.id_user_following !== u.id)
      );
    } else {
      const response = await addFollower(u.id, user.id);
      notify(response.message, "success");
      setUserFollowing((prevFollowingList) => [
        ...prevFollowingList,
        {
          id: userFollowing.length + 1,
          id_user_following: u.id,
          id_user_follwer: user.id,
        },
      ]);
    }
  };

  useEffect(() => {
    const fetchGetUserFollowing = async () => {
      const response = await getUserFollowing(user.id);
      setUserFollowing(response);
    };

    fetchGetUserFollowing();
  }, [user.id]);

  return (
    <article className="flex items-center justify-between bg-white border border-gray-200 px-4 py-3 rounded-sm">
      <div className="flex items-center gap-3">
        <img
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 object-cover"
          src="https://www.researchgate.net/profile/Maria-Monreal/publication/315108532/figure/fig1/AS:472492935520261@1489662502634/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png"
          alt="Avatar"
        />
        <div className="flex flex-col">
          <Link
            to={`/user/${u.username}`}
            className="text-xs sm:text-base font-semibold text-gray-800 hover:text-blue-600 transition"
          >
            {fullName}
          </Link>
          <p className="text-xs sm:text-base text-gray-400">@{u.username}</p>
        </div>
      </div>

      <button
        onClick={toggleFollowUser}
        className={`cursor-pointer px-4 py-1.5 text-xs sm:text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition rounded-sm ${
          user.id === u.id && "hidden"
        }`}
      >
        {userFollowing &&
        userFollowing.length > 0 &&
        userFollowing.some((f) => f.id_user_following === u.id)
          ? "Siguiendo"
          : "Seguir"}
      </button>
      <Link
        to={`/user/${user.username}`}
        className={`cursor-pointer px-4 py-1.5 text-xs sm:text-base font-medium bg-gray-400 text-white hover:bg-gray-600 transition rounded-sm ${
          user.id !== u.id && "hidden"
        }`}
      >
        Ver Perfil
      </Link>
    </article>
  );
};
