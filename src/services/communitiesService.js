export const getAllCommunities = async () => {
  try {
    const response = await fetch("http://localhost:3000/communities", {
      method: "GET",
    });

    const data = await response.json();

    return data.communities;
  } catch (e) {
    console.error(e.message);
  }
};
