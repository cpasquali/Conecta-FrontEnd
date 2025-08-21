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
    <BaseModal isOpen={isOpenUpdatePostModal} width={400}>
      <button
        onClick={fetchDeletePost}
        className="flex items-center justify-center w-full gap-2 flex-1 cursor-pointer min-h-14 bg-red-600 hover:bg-red-700 text-white font-semibold transition text-base"
      >
        Eliminar posteo <ion-icon name="cloud-upload-outline"></ion-icon>
      </button>
    </BaseModal>
  );
};
