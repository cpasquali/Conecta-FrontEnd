import { useAuth } from "../../context/AuthUserContext";
import { PostCard } from "../PostCard/PostCard";
import { useState } from "react";
import { CreatePostModal } from "../Modals/CreatePostModal";
import { useLocation } from "wouter";
import { usePost } from "../../context/PostsContext";
import { PostCardSkeleton } from "../PostCard/PostCardSkeleton";

export const PostList = () => {
  const { user } = useAuth();
  const [isModalActive, setIsModalActive] = useState(false);
  const [_, setLocation] = useLocation();
  const { postList, isLoading } = usePost();

  const handleOpenModal = () => {
    if (user) {
      setIsModalActive(!isModalActive);
    } else {
      setLocation("/login");
    }
  };

  if (isLoading) {
    return (
      <section className="mt-[-36px] sm:ml-[-160px] sm:mt-10 w-full flex flex-col items-center justify-center">
        <section className="mt-10 w-full flex flex-col items-center justify-center sm:w-[45%] gap-4 pt-2">
          {Array(9)
            .fill(null)
            .map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
        </section>
      </section>
    );
  }

  return (
    <section className="sm:ml-[-160px] sm:mt-10 w-full flex flex-col items-center justify-center bg-gray-200 sm:bg-white">
      <button
        onClick={handleOpenModal}
        className="rounded-sm cursor-pointer hidden sm:flex items-center justify-center gap-2 h-10 bg-blue-600 text-white hover:bg-blue-700 font-semibold transition w-80 text-lg"
      >
        Subir post <ion-icon name="duplicate-outline"></ion-icon>
      </button>

      <section className="sm:mt-6 w-full flex flex-col items-center justify-center sm:w-[45%] gap-2 sm:gap-4 pt-2">
        {postList &&
          postList.length > 0 &&
          postList.map((p) => <PostCard key={p.id} post={p} />)}
      </section>

      <CreatePostModal
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
      />
    </section>
  );
};
