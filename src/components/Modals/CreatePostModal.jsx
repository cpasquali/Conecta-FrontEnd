import { BaseModal } from "./BaseModal";
import { Input } from "../Input";
import { uploadPost } from "../../services/postServices";
import { useState } from "react";
import { useAuth } from "../../context/AuthUserContext";
import { notify } from "../../utils/notify";
import { usePost } from "../../context/PostsContext";

export const CreatePostModal = ({ isModalActive, setIsModalActive }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const { setPostList } = usePost();
  const { user } = useAuth();
  const handleSubmit = async () => {
    const response = await uploadPost(user.id, form);
    if (response.status === "error") {
      notify(response.message, response.status);
      return;
    }

    setPostList((prev) => [response.newPost, ...prev]);
    setIsModalActive(false);
    setForm({
      title: "",
      description: "",
    });
    notify(response.message, response.status);
  };

  const handleInputForm = (e, property) => {
    setForm({
      ...form,
      [property]: e.target.value,
    });
  };

  return (
    <BaseModal isOpen={isModalActive} width={410}>
      <div className="flex flex-col gap-5 p-4">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          🚀 Comparte tus novedades
        </h2>

        <Input
          type="text"
          placeholder="Título del post..."
          onInputChange={(e) => handleInputForm(e, "title")}
          value={form.title}
          className="w-full"
        />

        <textarea
          placeholder="Escribe una descripción atractiva..."
          value={form.description}
          onChange={(e) => handleInputForm(e, "description")}
          className="w-full rounded-sm min-h-[120px] border border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 resize-none pt-2 pl-2"
        />

        <div className="flex gap-3 justify-between">
          <button
            onClick={handleSubmit}
            className="rounded-sm flex items-center justify-center gap-2 flex-1 cursor-pointer h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition text-base"
          >
            Postear <ion-icon name="cloud-upload-outline"></ion-icon>
          </button>

          <button
            onClick={() => setIsModalActive(!isModalActive)}
            className="rounded-sm flex items-center justify-center gap-2 flex-1 cursor-pointer h-10 bg-gray-400  hover:bg-gray-600 text-white font-semibold transition text-base"
          >
            Cerrar <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
