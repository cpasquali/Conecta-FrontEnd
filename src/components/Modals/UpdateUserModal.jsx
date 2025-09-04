import { useAuth } from "../../context/AuthUserContext";
import { Input } from "../Input";
import { BaseModal } from "./BaseModal";
import { updateUser } from "../../services/userServices";
import { useState } from "react";
import { notify } from "../../utils/notify";

export const UpdateUserModal = ({ isModalActive, setIsModalActive }) => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState("");

  const handleForm = (e, property) => {
    if (property === "image") {
      const image = URL.createObjectURL(e.target.files[0]);
      setImagePreview(image);
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({
        ...form,
        [property]: e.target.value,
      });
    }
  };

  const fetchUpdateUser = async (e) => {
    e.preventDefault();
    const response = await updateUser(user.id, form);
    notify(response.message, "success");
    setUser(response.updatedUser);
  };

  return (
    <BaseModal isOpen={isModalActive} width={410}>
      <h1>Editor de usuario</h1>
      <form
        className="relative flex flex-col justify-center items-center gap-4 w-full "
        onSubmit={fetchUpdateUser}
      >
        <div>
          <section>
            <input
              type="file"
              className="hidden"
              id="file"
              onChange={(e) => handleForm(e, "image")}
            />
            {imagePreview ? (
              <section>
                <label className="relative">
                  <img
                    className="w-10 h-10 sm:w-50 sm:h-50 rounded-full border-2 object-contain relative"
                    src={imagePreview}
                    alt="foto de perfil"
                  />
                  <p
                    onClick={() => {
                      setImagePreview(null);
                    }}
                    className="flex cursor-pointer items-center justify-center w-10 h-10 bottom-0 right-6 bg-red-600 hover:bg-red-700 text-white font-semibold transition text-2xl rounded-full absolute"
                  >
                    <ion-icon name="close-outline"></ion-icon>
                  </p>
                </label>
              </section>
            ) : (
              <label htmlFor="file" className="cursor-pointer relative">
                <img
                  className="w-10 h-10 sm:w-50 sm:h-50 rounded-full border-2 object-cover"
                  src={user.image_url}
                  alt="Avatar"
                />
                <p className="flex items-center justify-center w-10 h-10 bottom-0 right-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition text-2xl rounded-full absolute">
                  <ion-icon name="pencil"></ion-icon>
                </p>
              </label>
            )}
          </section>
        </div>
        <Input
          type="text"
          placeholder={user.first_name}
          onInputChange={(e) => handleForm(e, "first_name")}
        />
        <Input
          type="text"
          placeholder={user.last_name}
          onInputChange={(e) => handleForm(e, "last_name")}
        />
        <Input
          type="text"
          placeholder={user.username}
          disabled={true}
          className="border-gray-400 w-full placeholder-gray-600"
        />
        <div className="flex gap-3 justify-between w-full">
          <button
            type="submit"
            className="rounded-sm flex items-center justify-center gap-2 flex-1 cursor-pointer h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition text-base"
          >
            Postear <ion-icon name="cloud-upload-outline"></ion-icon>
          </button>

          <button
            onClick={() => {
              setIsModalActive(!isModalActive);
              setForm({
                first_name: "",
                last_name: "",
                image: null,
              });
              setImagePreview(null);
            }}
            className="rounded-sm flex items-center justify-center gap-2 flex-1 cursor-pointer h-10 bg-gray-400  hover:bg-gray-600 text-white font-semibold transition text-base"
          >
            Cerrar <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>
      </form>
    </BaseModal>
  );
};
