const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getPostComment = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/comments/${id}`);
    const data = await response.json();
    return data.comments;
  } catch {
    console.log("Error en el servidor");
  }
};

export const createComment = async (id, userId, description) => {
  try {
    const response = await fetch(`${BASE_URL}/comments/${id}/${userId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        description: description,
      }),
    });
    const data = await response.json();
    return data;
  } catch {
    console.log("Error en el servidor");
  }
};
