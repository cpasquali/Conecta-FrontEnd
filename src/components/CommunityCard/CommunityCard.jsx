export const CommunityCard = ({ community }) => {
  return (
    <article className="flex items-center justify-between bg-white border border-gray-200 px-4 py-4 rounded-md">
      <h2>{community.name}</h2>
      <button className="cursor-pointer px-4 py-1.5 text-xs sm:text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition rounded-md">
        Ver comunidad
      </button>
    </article>
  );
};
