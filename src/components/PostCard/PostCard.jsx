import { useEffect, useState } from "react";
import { getPostComment } from "../../services/commentServices";
import {
  addPostLike,
  getUserPostLike,
  deletePostLike,
} from "../../services/postLikesServices";
import { Link, useLocation } from "wouter";
import { useAuth } from "../../context/AuthUserContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { notify } from "../../utils/notify";
import { UpdatePostModal } from "../Modals/UpdatePostModal";
import { usePost } from "../../context/PostsContext";

export const PostCard = ({ post, widthPostCard = "w-full" }) => {
  const [comments, setComments] = useState([]);
  const [isOpenUpdatePostModal, setIsOpenUpdatePostModal] = useState(false);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [_, setLocation] = useLocation();
  const { user } = useAuth();
  const { postList, setPostList } = usePost();

  dayjs.extend(relativeTime);
  dayjs.locale("es");
  const date = dayjs(post.created_at);
  const formatted_date =
    dayjs().diff(date, "month") >= 1
      ? date.format("D [de] MMMM [de] YYYY")
      : date.fromNow();

  const fullName = post.first_name + " " + post.last_name;

  const fetchComments = async () => {
    const response = await getPostComment(post.id);
    setComments(response);
  };

  const fetchUserPostLike = async () => {
    const response = await getUserPostLike(post.id, user.id);
    setIsPostLiked(response.liked);
  };

  const toggleLike = async () => {
    if (isPostLiked) {
      await deletePostLike(post.id, user.id);
      setIsPostLiked(false);
      const newArray = [...postList];
      const index = newArray.findIndex((p) => p.id === post.id);
      newArray[index] = {
        ...post,
        cant_likes: post.cant_likes - 1,
      };
      setPostList(newArray);
      notify("Ya no te gusta la publicacion", "success");
    } else {
      await addPostLike(post.id, user.id);
      setIsPostLiked(true);
      const newArray = [...postList];
      const index = newArray.findIndex((p) => p.id === post.id);
      newArray[index] = {
        ...post,
        cant_likes: post.cant_likes + 1,
      };
      setPostList(newArray);
      notify("Te gusta la publicacion", "success");
    }
  };

  useEffect(() => {
    fetchComments();
    fetchUserPostLike();
  }, [post]);

  return (
    <article
      className={`${widthPostCard} sm:w-full bg-white sm:rounded-md p-6 hover:bg-gray-100 cursor-pointer`}
    >
      <div className="flex sm:items-start justify-between mb-5 border-b border-gray-100 pb-4">
        <div className="flex gap-4">
          <img
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 object-cover"
            src="https://www.researchgate.net/profile/Maria-Monreal/publication/315108532/figure/fig1/AS:472492935520261@1489662502634/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png"
            alt="Avatar"
          />
          <div>
            <Link
              to={`/user/${post.username}`}
              className="text-xs sm:text-base font-semibold text-gray-800 hover:text-blue-600 transition"
            >
              {fullName}
            </Link>
            <p className="text-xs sm:text-base text-gray-400">
              @{post.username}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6">
          <p className="text-xs sm:text-base mt-[6px] text-gray-400">
            {formatted_date}
          </p>
          {post.user_id === user.id && (
            <p
              onClick={() => setIsOpenUpdatePostModal(!isOpenUpdatePostModal)}
              className="mt-[6px]"
            >
              <ion-icon name="ellipsis-horizontal"></ion-icon>
            </p>
          )}
        </div>
      </div>

      <div
        className="flex flex-col gap-4"
        onClick={() => setLocation(`/post/${post.id}`)}
      >
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 whitespace-normal break-words">
          {post.title}
        </h2>
        <p className="text-base sm:text-lg text-gray-700 whitespace-normal break-words">
          {post.description}
        </p>
      </div>

      <div className="flex items-center gap-4 mt-4 text-gray-600">
        <div className="flex items-center gap-1">
          <button
            onClick={toggleLike}
            className="cursor-pointer flex alig-center hover:text-red-600 hover:bg-red-100  p-2 rounded-full text-xl sm:text-2xl text-red-600 active:scale-120 transition transform duration-100"
            aria-label="Me gusta"
          >
            {isPostLiked ? (
              <ion-icon name="heart"></ion-icon>
            ) : (
              <ion-icon name="heart-outline"></ion-icon>
            )}
          </button>
          <span className="sm:text-lg font-medium text-gray-700">
            {post.cant_likes}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="cursor-pointer flex alig-center hover:text-blue-600 hover:bg-blue-100 transition-colors p-2 rounded-full text-xl   sm:text-2xl"
            aria-label="Comentarios"
          >
            <ion-icon name="chatbubble-outline"></ion-icon>
          </button>
          <span className="sm:text-lg font-medium text-gray-700">
            {comments.length}
          </span>
        </div>
      </div>
      <UpdatePostModal
        isOpenUpdatePostModal={isOpenUpdatePostModal}
        setIsOpenUpdatePostModal={setIsOpenUpdatePostModal}
        post={post}
      />
    </article>
  );
};
