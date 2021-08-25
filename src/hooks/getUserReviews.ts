import { useHttp } from "./";

const useGetUserReviews = () => {
  const { request } = useHttp();

  const getUserReviews = async (id: string, token: string | null) => {
    try {
      const reviews = await request(`/api/profile-reviews/${id}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      return reviews;
    } catch (e) {
      console.log(e, "E message createUserPage");
    }
  };

  return { getUserReviews };
};

export { useGetUserReviews };
