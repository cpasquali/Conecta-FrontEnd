import { useEffect, useRef, useState } from "react";
import { getAllUsers } from "../../services/userServices";
import { Input } from "../Input";
import { UserCard } from "../UserCard/UserCard";

export const ExploreContainter = () => {
  const [findUsers, setFindUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const timeoutRef = useRef(null);

  const fetchUsers = async (username) => {
    const data = await getAllUsers(null, username);
    if (data.hasOwnProperty("message")) {
      setMessage(data.message);
      setFindUsers([]);
      const timeout = setTimeout(() => {
        setMessage("");
        clearTimeout(timeout);
      }, 1000);
    } else {
      setFindUsers(data.users);
    }
  };

  const debounce = (text) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setSearch(text);
    }, 200);
  };

  useEffect(() => {
    if (!search) setFindUsers([]);
    fetchUsers(search);
  }, [search]);

  return (
    <section className="flex flex-col mt-6 items-center justify-center gap-2">
      <Input
        type="text"
        className="w-[95%]"
        placeholder="Buscar..."
        onInputChange={(e) => debounce(e.target.value)}
      />
      <section className="flex flex-col gap-1 w-[95%]">
        {findUsers && findUsers.length > 0 ? (
          findUsers.map((u) => <UserCard key={u.id} u={u} />)
        ) : (
          <p className="mt-4 text-center">{message}</p>
        )}
      </section>
    </section>
  );
};
