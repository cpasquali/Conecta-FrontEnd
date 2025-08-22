const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const data = await response.json();
    return data.posts;
  } catch {
    console.log("Error en el servidor");
  }
};

export const getAllPostByUserId = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`);
    const data = await response.json();
    return data.posts;
  } catch {
    console.log("Error en el servidor");
  }
};

export const getPostById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/post/${id}`);
    const data = await response.json();
    return data.post[0];
  } catch {
    console.log("Error en el servidor");
  }
};

export const uploadPost = async (id, postData) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: postData.title,
        description: postData.description,
      }),
    });

    const status = response.ok ? "success" : "error";
    const data = await response.json();
    return { newPost: data.newPost, message: data.message, status: status };
  } catch (e) {
    console.log(e.message);
  }
};

export const deletePost = async (post_id, id) => {
  try {
    const data = await fetch(`${BASE_URL}/posts/${id}/${post_id}`, {
      method: "DELETE",
    });
    return data;
  } catch (e) {
    console.log(e.message);
  }
};
