import { Link } from "wouter";

export const CommentCard = ({ comment }) => {
  const fullName = comment.first_name + " " + comment.last_name;
  const fecha = new Date(comment.created_at);
  const fecha_formateada = fecha.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
  });

  return (
    <article className="bg-gray-50  justify-self-center sm:w-full p-4 border mt-2">
      <div className="flex gap-3 items-start">
        <img
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border object-cover"
          src="https://www.researchgate.net/profile/Maria-Monreal/publication/315108532/figure/fig1/AS:472492935520261@1489662502634/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png"
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
        <p className="text-xs sm:text-base text-gray-400">{fecha_formateada}</p>
      </div>
    </article>
  );
};
