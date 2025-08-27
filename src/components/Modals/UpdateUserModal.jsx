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
  });

  const handleForm = (e, property) => {
    setForm({
      ...form,
      [property]: e.target.value,
    });
  };

  const fetchUpdateUser = async (e) => {
    e.preventDefault();
    await updateUser(user.id, form);
    const newFirstName = form.first_name ? form.first_name : user.first_name;
    const newLastName = form.last_name ? form.last_name : user.last_name;
    setUser({ ...user, first_name: newFirstName, last_name: newLastName });
    notify("Datos actualizados correctamente", "success");
  };

  return (
    <BaseModal isOpen={isModalActive} width={410}>
      <h1>Editor de usuario</h1>
      <form
        className="relative flex flex-col justify-center items-center gap-4 w-full "
        onSubmit={fetchUpdateUser}
      >
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
        <Input type="text" placeholder={user.username} disabled={true} />
        <div className="flex gap-3 justify-between w-full">
          <button
            type="submit"
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
      </form>
    </BaseModal>
  );
};
