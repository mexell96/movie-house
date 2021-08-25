import { message } from "antd";

import { useHttp } from "./";

const useSetReview = () => {
  const { request } = useHttp();

  const setReview = async (newReview: ReviewType) => {
    try {
      const response = await request("/api/create-review", "POST", newReview);
      message.success(response.message);
    } catch (e) {
      console.log(e, "E message createUserPage");
    }
  };
  return { setReview };
};
export { useSetReview };
