import { BaseModal } from "./BaseModal";
import { deletePost } from "../../services/postServices";
import { notify } from "../../utils/notify";
import { useAuth } from "../../context/AuthUserContext";
import { usePost } from "../../context/PostsContext";

export const UpdatePostModal = ({
  post,
  isOpenUpdatePostModal,
  setIsOpenUpdatePostModal,
}) => {
  const { user } = useAuth();
  const { setPostList } = usePost();
  const fetchDeletePost = async () => {
    await deletePost(post.id, user.id);
    setPostList((prev) => prev.filter((p) => p.id !== post.id));
    notify("Post eliminado con exito", "success");
    setIsOpenUpdatePostModal(!isOpenUpdatePostModal);
  };

  return (
    <BaseModal
      isOpen={isOpenUpdatePostModal}
      width="400px"
      isResponsiveModal={true}
      height="100"
    >
      <section className="flex flex-col gap-4 h-50 w-full px-4">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-1">
          Posteo
        </h2>
        <button
          onClick={fetchDeletePost}
          className="rounded-sm flex items-center justify-center gap-2 flex-1 cursor-pointer w-full h-10 bg-red-600  hover:bg-red-700 text-white font-semibold transition text-base"
        >
          Eliminar posteo <ion-icon name="cloud-upload-outline"></ion-icon>
        </button>
        <button
          onClick={() => setIsOpenUpdatePostModal(!isOpenUpdatePostModal)}
          className="rounded-sm flex items-center justify-center gap-2 flex-1 cursor-pointer h-10 bg-gray-400  hover:bg-gray-600 text-white font-semibold transition text-base"
        >
          Cerrar <ion-icon name="close-outline"></ion-icon>
        </button>
      </section>
    </BaseModal>
  );
};
