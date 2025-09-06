import { Input } from "../Input";
import { BaseModal } from "./BaseModal";
import { deleteUser } from "../../services/userServices";
import { useState } from "react";
import { notify } from "../../utils/notify";
import { useAuth } from "../../context/AuthUserContext";
import { useLocation } from "wouter";

export const DeleteUserModal = ({
  isDeleteModalActive,
  setIsModalDeleteActive,
}) => {
  const [password, setPassword] = useState("");
  const { user, setUser } = useAuth();
  const [_, setLocation] = useLocation();

  const fetchDeleteUser = async () => {
    const response = await deleteUser(user.id, password);
    if (!response.ok) {
      notify("Credenciales incorrectas", "error");
      return;
    }
    setUser(null);
    setIsModalDeleteActive(false);
    setLocation("/welcome");
  };

  return (
    <BaseModal width="450px" isOpen={isDeleteModalActive}>
      <section className="flex flex-col items-center justify-center gap-4 mt-2">
        <h2 className="text-2xl">Eliminacion de cuenta</h2>
        <p>La cuenta sera eliminada de forma permanente</p>
        <Input
          type="password"
          placeholder="Contraseña..."
          onInputChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={fetchDeleteUser}
          className="rounded-sm flex items-center justify-center w-full gap-2 flex-1 cursor-pointer min-h-12 bg-red-600 hover:bg-red-700 text-white font-semibold transition text-base"
        >
          Eliminar
        </button>
        <button
          className="rounded-sm w-[75%] h-10 bg-gray-400  hover:bg-gray-600 text-white font-semibold transition text-base cursor-pointer"
          onClick={() => setIsModalDeleteActive(!isDeleteModalActive)}
        >
          Cerrar
        </button>
      </section>
    </BaseModal>
  );
};
