import { Link } from "wouter";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const CommentCard = ({ comment }) => {
  const fullName = comment.first_name + " " + comment.last_name;
  dayjs.extend(relativeTime);
  dayjs.locale("es");
  const date = dayjs(comment.created_at);
  const formatted_date =
    dayjs().diff(date, "month") >= 1
      ? date.format("D [de] MMMM [de] YYYY")
      : date.fromNow();

  return (
    <article className="rounded-sm bg-gray-50  justify-self-center sm:w-full p-4 border mt-2">
      <div className="flex gap-3 items-start">
        <img
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border object-cover"
          src={comment.profile_img}
          alt="Avatar"
        />

        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Link
              to={`/user/${comment.username}`}
              className="text-xs sm:text-base font-semibold text-gray-800 hover:text-red-600 transition"
            >
              {fullName}
            </Link>
            <span className="text-xs sm:text-base text-gray-400">
              @{comment.username}
            </span>
          </div>
          <p className="text-xs sm:text-base text-gray-600">
            {comment.description}
          </p>
        </div>
        <p className="text-xs sm:text-base text-gray-400">{formatted_date}</p>
      </div>
    </article>
  );
};
