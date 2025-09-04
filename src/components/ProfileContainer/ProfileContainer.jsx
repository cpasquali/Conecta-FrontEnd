import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthUserContext";
import { getAllPostByUserId } from "../../services/postServices";
import { PostCard } from "../PostCard/PostCard";
import { useRoute } from "wouter";
import {
  removeFollower,
  addFollower,
  getUserByUsername,
  getUserFollowing,
} from "../../services/userServices";
import { notify } from "../../utils/notify";
import { UpdateUserModal } from "../Modals/UpdateUserModal";
import { UserInfoModal } from "../Modals/UserInfoModal";
import { ProfileContainerSkeleton } from "./ProfileContainerSkeleton";

export const ProfileContainer = () => {
  const [postList, setPostList] = useState([]);
  const { user } = useAuth();
  const [profile, setProfile] = useState({});
  const [isModalActive, setIsModalActive] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userFollowing, setUserFollowing] = useState([]);
  const [match, params] = useRoute("/user/:username");
  const [isLoading, setIsLoading] = useState(true);
  const username = match && params.username;
  const fullName = profile.first_name + " " + profile.last_name;

  const fetchProfile = async () => {
    try {
      const response = await getUserByUsername(username);
      setProfile(response);

      if (response?.id) {
        const posts = await getAllPostByUserId(response.id);
        setPostList(posts);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFollowUser = async () => {
    if (userFollowing.some((f) => f.id_user_following === profile.id)) {
      const response = await removeFollower(profile.id, user.id);
      notify(response.message, "success");
      setProfile({ ...profile, cant_followers: profile.cant_followers - 1 });
      setUserFollowing((prevFollowingList) =>
        prevFollowingList.filter((f) => f.id_user_following !== profile.id)
      );
    } else {
      const response = await addFollower(profile.id, user.id);
      notify(response.message, "success");
      setProfile({ ...profile, cant_followers: profile.cant_followers + 1 });
      setUserFollowing((prevFollowingList) => [
        ...prevFollowingList,
        {
          id: userFollowing.length + 1,
          id_user_following: profile.id,
          id_user_follwer: user.id,
        },
      ]);
    }
  };

  const fetchGetUserFollowing = async () => {
    const response = await getUserFollowing(user.id);
    setUserFollowing(response);
  };

  useEffect(() => {
    fetchProfile();
    fetchGetUserFollowing();
  }, [username]);

  if (isLoading) {
    return <ProfileContainerSkeleton />;
  }

  return (
    <section className="mt-6 flex flex-col items-center justify-center gap-4">
      <section className="flex items-center justify-evenly sm:justify-center sm:gap-10 w-full">
        <img
          className="w-14 h-14 sm:w-34 sm:h-34 rounded-full object-cover border border-gray-400"
          src={profile.image_url}
          alt="imagen de perfil"
        />

        <section className="flex flex-col items-start sm:items-start gap-2">
          <h2 className="text-sm sm:text-2xl font-semibold">{fullName}</h2>
          <section className="flex gap-6">
            <h3 className="text-sm sm:text-base font-semibold text-gray-500">
              <span className="text-black mr-1">
                {profile.cant_followers || 0}
              </span>
              seguidores
            </h3>
            <h3 className="text-sm sm:text-base font-semibold text-gray-500">
              <span className="text-black mr-1">
                {profile.cant_following || 0}
              </span>
              siguiendo
            </h3>
          </section>
        </section>
      </section>

      <section className="flex gap-2 sm:mt-4">
        <button
          onClick={toggleFollowUser}
          className={`${
            username === user.username ? "hidden" : ""
          } cursor-pointer w-36 px-4 py-1.5 text-xs sm:text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition mt-2 mb-2 rounded-sm`}
        >
          {userFollowing?.some((u) => u.id_user_following === profile.id)
            ? "Siguiendo"
            : "Seguir"}
        </button>

        <button
          onClick={() => setIsModalActive(!isModalActive)}
          className={`${
            username !== user.username ? "hidden" : ""
          } cursor-pointer w-36 px-4 py-1.5 text-xs sm:text-base font-medium bg-gray-400 text-white hover:bg-gray-600 transition mt-2 mb-2 rounded-sm`}
        >
          Editar perfil
        </button>

        <button
          className="cursor-pointer w-36 px-4 py-1.5 text-xs sm:text-base font-medium bg-gray-700 text-white hover:bg-gray-800 transition mt-2 mb-2 rounded-sm"
          onClick={() => setIsOpenModal(!isOpenModal)}
        >
          Ver info
        </button>
      </section>

      <div className="flex items-center w-full">
        <span className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></span>

        <span className="shrink-0 px-4 text-gray-900 dark:text-white">
          Actividad
        </span>

        <span className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></span>
      </div>
      <section className="flex flex-col items-center w-full max-w-xl gap-4">
        {postList && postList.length > 0 ? (
          postList?.map((p) => (
            <PostCard
              key={p?.created_at + p.username}
              post={p}
              widthPostCard="w-full"
            />
          ))
        ) : (
          <p className="mt-10">No hay actividad aun</p>
        )}
      </section>
      <UpdateUserModal
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
      />
      <UserInfoModal
        profile={profile}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </section>
  );
};
