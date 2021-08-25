import { useHttp } from "./";

const useGetReviews = () => {
  const { request } = useHttp();

  const getReviews = async (id: string) => {
    try {
      const reviews = await request(`/api/reviews/${id}`, "GET");
      console.log(reviews, "reviews 333");

      return reviews;
    } catch (e) {
      console.log(e, "E message createUserPage");
    }
  };

  return { getReviews };
};

export { useGetReviews };
