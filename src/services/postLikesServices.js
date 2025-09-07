const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getUserPostLike = async (post_id, user_id) => {
  try {
    const response = await fetch(`${BASE_URL}/likes/${post_id}/${user_id}`);
    const data = await response.json();
    return data;
  } catch {
    console.log("Error en el servidor");
  }
};

export const addPostLike = async (post_id, user_id) => {
  try {
    const response = await fetch(`${BASE_URL}/likes/${post_id}/${user_id}`, {
      method: "POST",
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const deletePostLike = async (post_id, user_id) => {
  try {
    const response = await fetch(`${BASE_URL}/likes/${post_id}/${user_id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch {
    console.log("Error en el servidor");
  }
};
