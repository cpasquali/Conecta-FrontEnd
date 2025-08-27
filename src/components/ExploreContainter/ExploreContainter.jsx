import { useEffect, useRef, useState } from "react";
import { Input } from "../Input";
import { getAllUsers } from "../../services/userServices";
import { UserCard } from "../UserCard/UserCard";

export const ExploreContainter = () => {
  const [search, setSearch] = useState("");
  const [findUsers, setFindUsers] = useState([]);
  const timeoutRef = useRef(null);
  const [message, setMessage] = useState("");

  const debounce = (text) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setSearch(text);
    }, 500);
  };

  const fetchUsers = async (username) => {
    const data = await getAllUsers(null, username);
    if (data.hasOwnProperty("message")) {
      setMessage(data.message);
      setFindUsers([]);
    } else {
      setFindUsers(data.users);
    }
  };

  useEffect(() => {
    if (!search) return;
    fetchUsers(search);
  }, [search]);

  return (
    <section className="flex flex-col gap-6 items-center justify-center mt-10">
      <Input
        type="text"
        placeholder="Buscar..."
        className="w-[94%] sm:w-200"
        onInputChange={(e) => debounce(e.target.value)}
      />

      {findUsers && findUsers.length > 0 ? (
        <ul className="w-[94%] sm:w-200 flex flex-col gap-2">
          {findUsers.map((u) => (
            <li key={u.id}>
              <UserCard u={u} />
            </li>
          ))}
        </ul>
      ) : (
        <h2>{message}</h2>
      )}
    </section>
  );
};
