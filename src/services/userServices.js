export const login = async (e, userData) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        emailOrUsername: userData.emailOrUsername,
        password: userData.password,
      }),
    });

    const data = await response.json();
    const status = response.ok ? "success" : "error";
    return { message: data.message, user: data.user, status: status };
  } catch (e) {
    console.log(e.message);
  }
};

export const register = async (e, userData) => {
  e.preventDefault();
  try {
    if (userData.password !== userData.confirmPassword) {
      return { message: "Las contraseñas deben ser iguales", status: "error" };
    }
    const response = await fetch("http://localhost:3000/users/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        first_name: userData.first_name,
        last_name: userData.last_name,
        username: userData.username,
        email: userData.email,
        password: userData.password,
      }),
    });
    const data = await response.json();
    const status = response.ok ? "success" : "error";
    return { message: data.message, status: status };
  } catch (e) {
    return e.message;
  }
};

export const getAllUsers = async (id, username) => {
  try {
    if (username) {
      const response = await fetch(
        `http://localhost:3000/users?username=${username}`
      );

      const data = await response.json();

      return data;
    }
    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();
    const users = data.users.filter((u) => u.id !== id);
    return users;
  } catch {
    console.log("Error en el servidor");
  }
};

export const getUserById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`);
    const data = await response.json();
    return data.users[0];
  } catch {
    console.log("Error en el servidor");
  }
};

export const addFollower = async (id_user_following, id_user_follower) => {
  try {
    const response = await fetch(
      `http://localhost:3000/userFollowers/${id_user_following}/${id_user_follower}`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e.message);

    console.log("Error en el servidor");
  }
};

export const removeFollower = async (id_user_following, id_user_follower) => {
  try {
    const response = await fetch(
      `http://localhost:3000/userFollowers/${id_user_following}/${id_user_follower}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e.message);

    console.log("Error en el servidor");
  }
};

export const getUserFollowing = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/userFollowers/following/${id}`
    );

    const data = await response.json();

    return data.followers;
  } catch (e) {
    console.log(e.message);
  }
};

export const updateUser = async (id, formData) => {
  try {
    const response = await fetch(`http://localhost:3000/users/update/${id}`, {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({
        first_name: formData.first_name,
        last_name: formData.last_name,
      }),
    });

    const data = await response.json();

    return data.message;
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteUser = async (id, password) => {
  try {
    const response = await fetch(`http://localhost:3000/users/${id}/delete/`, {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({ password: password }),
    });

    return response;
  } catch (e) {
    console.error(e.message);
  }
};
