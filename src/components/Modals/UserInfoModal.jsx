import { useAuth } from "../../context/AuthUserContext";
import { BaseModal } from "./BaseModal";
import { DeleteUserModal } from "./DeleteUserModal";
import { useState } from "react";

export const UserInfoModal = ({ profile, isOpenModal, setIsOpenModal }) => {
  const date = new Date(profile?.created_at);
  const formatted_date = date.toLocaleDateString("es-ar", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const { user } = useAuth();

  const [isDeleteModalActive, setIsModalDeleteActive] = useState(false);

  return (
    <BaseModal isOpen={isOpenModal} width={610}>
      <section className="flex items-center justify-center flex-col gap-6 w-full">
        <img
          className="w-10 h-10 sm:w-22 sm:h-22 rounded-full border-2 object-cover"
          src="https://www.researchgate.net/profile/Maria-Monreal/publication/315108532/figure/fig1/AS:472492935520261@1489662502634/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png"
          alt="Avatar"
        />
        <h2>{profile?.username}</h2>
        <article className="pl-4 flex items-center gap-4 w-full">
          <p className="text-[36px]  pt-3">
            <ion-icon name="calendar-outline"></ion-icon>
          </p>
          <div>
            <p className="text-xs sm:text-base">Activo desde</p>
            <p className="text-xs sm:text-base text-gray-500">
              {formatted_date}
            </p>
          </div>
        </article>
        {profile.id === user.id && (
          <article
            onClick={() => setIsModalDeleteActive(!isDeleteModalActive)}
            className="rounded-sm bg-red-200 border border-red-600 pl-4 w-full flex items-center gap-4 cursor-pointer"
          >
            <p className="text-[36px] pt-3">
              <ion-icon name="trash-outline"></ion-icon>
            </p>
            <div>
              <p className="text-xs sm:text-base">Eliminar cuenta</p>
              <p className="text-xs sm:text-base text-gray-500">
                La cuenta se eliminara de forma permanente
              </p>
            </div>
          </article>
        )}
      </section>
      <button
        className="rounded-sm w-[75%] h-10 bg-gray-400  hover:bg-gray-600 text-white font-semibold transition text-base cursor-pointer"
        onClick={() => setIsOpenModal(!isOpenModal)}
      >
        Cerrar
      </button>
      <DeleteUserModal
        isDeleteModalActive={isDeleteModalActive}
        setIsModalDeleteActive={setIsModalDeleteActive}
      />
    </BaseModal>
  );
};
