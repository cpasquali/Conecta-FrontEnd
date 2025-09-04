const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const login = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
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

export const register = async (userData) => {
  try {
    if (userData.password !== userData.confirmPassword) {
      return { message: "Las contraseñas deben ser iguales", status: "error" };
    }

    const formData = new FormData();
    formData.append("first_name", userData.first_name);
    formData.append("last_name", userData.last_name);
    formData.append("username", userData.username);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("image", userData.image);

    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    const status = response.ok ? "success" : "error";
    const newUser = data.newUser;

    return { message: data.message, status: status, newUser };
  } catch (e) {
    return e.message;
  }
};

export const getAllUsers = async (id, username, email) => {
  try {
    if (username) {
      const response = await fetch(`${BASE_URL}/users?username=${username}`);

      const data = await response.json();

      return data;
    }

    if (email) {
      const response = await fetch(`${BASE_URL}/users?email=${email}`);

      const data = await response.json();

      return data;
    }
    const response = await fetch(`${BASE_URL}/users`);
    const data = await response.json();
    const users = data.users.filter((u) => u.id !== id);
    return users;
  } catch {
    console.log("Error en el servidor");
  }
};

export const getUserByUsername = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}`);
    const data = await response.json();
    return data.users[0];
  } catch {
    console.log("Error en el servidor");
  }
};

export const addFollower = async (id_user_following, id_user_follower) => {
  try {
    const response = await fetch(
      `${BASE_URL}/userFollowers/${id_user_following}/${id_user_follower}`,
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
      `${BASE_URL}/userFollowers/${id_user_following}/${id_user_follower}`,
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
    const response = await fetch(`${BASE_URL}/userFollowers/following/${id}`);

    const data = await response.json();

    return data.followers;
  } catch (e) {
    console.log(e.message);
  }
};

export const updateUser = async (id, userUpdateData) => {
  try {
    const formData = new FormData();
    formData.append("first_name", userUpdateData.first_name);
    formData.append("last_name", userUpdateData.last_name);
    formData.append("image", userUpdateData.image);

    const response = await fetch(`${BASE_URL}/users/update/${id}`, {
      method: "PATCH",
      body: formData,
    });

    const data = await response.json();

    return { message: data.message, updatedUser: data.updatedUser };
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteUser = async (id, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}/delete/`, {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({ password: password }),
    });

    return response;
  } catch (e) {
    console.error(e.message);
  }
};
