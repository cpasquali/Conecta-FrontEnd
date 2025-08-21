import { useEffect, useState } from "react";
import { getPostById } from "../../services/postServices";
import { getPostComment, createComment } from "../../services/commentServices";
import { Link, useLocation, useRoute } from "wouter";
import { Input } from "../Input";
import { CommentCard } from "../CommentCard/CommentCard";
import { useAuth } from "../../context/AuthUserContext";
import { usePost } from "../../context/PostsContext";
import {
  addPostLike,
  deletePostLike,
  getUserPostLike,
} from "../../services/postLikesServices";
import { notify } from "../../utils/notify";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const PostInfoContainer = () => {
  const [post, setPost] = useState({});
  const { user } = useAuth();
  const { postList, setPostList } = usePost();
  const [comments, setComments] = useState([]);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [_, setLocation] = useLocation();
  const [match, params] = useRoute("/post/:id");
  const id = match && params.id;
  const full_name = post.first_name + " " + post.last_name;
  dayjs.extend(relativeTime);
  dayjs.locale("es");
  const date = dayjs(post.created_at);
  const formatted_date =
    dayjs().diff(date, "month") >= 1
      ? date.format("D [de] MMMM [de] YYYY")
      : date.fromNow();

  const fetchPost = async () => {
    const response = await getPostById(id);
    setPost(response);
  };

  const fetchUserPostLike = async () => {
    const response = await getUserPostLike(id, user.id);
    setIsPostLiked(response.liked);
  };

  const fetchComments = async () => {
    const response = await getPostComment(id);
    setComments(response);
  };

  const createNewComment = async () => {
    const response = await createComment(post.id, user.id, newComment);
    notify(response, "success");
    await fetchComments();
  };

  const togglePostLike = async () => {
    if (isPostLiked) {
      await deletePostLike(id, user.id);
      setIsPostLiked(false);
      const newArray = [...postList];
      const index = newArray.findIndex((p) => p.id === post.id);
      newArray[index] = { ...post, cant_likes: post.cant_likes - 1 };
      setPostList(newArray);
      setPost({ ...post, cant_likes: post.cant_likes - 1 });
      notify("Ya no te gusta la publicacion", "success");
    } else {
      await addPostLike(id, user.id);
      setIsPostLiked(true);
      const newArray = [...postList];
      const index = newArray.findIndex((p) => p.id === post.id);
      newArray[index] = { ...post, cant_likes: post.cant_likes + 1 };
      setPostList(newArray);
      setPost({ ...post, cant_likes: post.cant_likes + 1 });
      notify("Te gusta la publicacion", "success");
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
    fetchUserPostLike();
  }, []);

  return (
    <section className="flex flex-col gap-8 px-6 sm:px-20 py-10 w-full max-w-5xl mx-auto">
      <button
        onClick={() => setLocation("/")}
        className="flex items-center gap-2 cursor-pointer w-fit bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 shadow transition text-sm sm:text-base"
      >
        <ion-icon name="arrow-back-outline"></ion-icon>
        Volver a Posts
      </button>

      <section className="flex items-center gap-4">
        <img
          className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border object-cover"
          src="https://www.researchgate.net/profile/Maria-Monreal/publication/315108532/figure/fig1/AS:472492935520261@1489662502634/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png"
          alt="Avatar"
        />
        <div className="flex flex-col">
          <Link
            to={`/user/${post.username}`}
            className="text-base sm:text-lg font-semibold text-gray-800 hover:text-blue-600 transition"
          >
            {full_name}
          </Link>
          <p className="text-sm text-gray-500">@{post.username}</p>
        </div>
      </section>

      <section className="flex gap-6 my-[-16px]">
        <div className="flex items-center gap-1">
          <button
            onClick={togglePostLike}
            className="cursor-pointer flex alig-center hover:text-red-600 hover:bg-red-100  p-2 rounded-full text-xl sm:text-2xl text-red-600 active:scale-120 transition transform duration-100"
            aria-label="Me gusta"
          >
            {isPostLiked ? (
              <ion-icon name="heart"></ion-icon>
            ) : (
              <ion-icon name="heart-outline"></ion-icon>
            )}
          </button>
          <span className="text-base font-medium text-gray-700">
            {post.cant_likes}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="cursor-pointer flex alig-center hover:text-blue-600 hover:bg-blue-100 transition-colors p-2 rounded-full text-xl  sm:text-2xl"
            aria-label="Comentarios"
          >
            <ion-icon name="chatbubble-outline"></ion-icon>
          </button>
          <span className="text-base font-medium text-gray-700">
            {comments.length}
          </span>
        </div>
      </section>

      <section className="flex flex-col gap-2 w-full">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 whitespace-normal break-words">
          {post.title}
        </h2>
        <p className="text-gray-600 text-base whitespace-normal break-words">
          {post.description}
        </p>
        <p className="text-gray-600 text-base whitespace-normal break-words mt-4">
          {formatted_date}
        </p>
      </section>

      <section className="w-full">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Comentarios
        </h3>
        <form
          className="flex gap-2"
          onSubmit={(e) => createNewComment(e.preventDefault())}
        >
          <Input
            type="text"
            placeholder="Se el primero en comentar..."
            onInputChange={(e) => setNewComment(e.target.value)}
          />
          <button
            type="submit"
            className="flex items-center gap-2 cursor-pointer w-fit bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 shadow transition text-sm sm:text-base"
          >
            Postear
          </button>
        </form>

        {comments && comments.length > 0 && (
          <div className="flex flex-col gap-4 mt-6">
            {comments.map((c) => (
              <CommentCard key={c.id} comment={c} />
            ))}
          </div>
        )}
      </section>
    </section>
  );
};
