import instance from "./instance";

export const deleteReview = async (uid: any) => {
  try {
    const { data } = await instance({
      method: "DELETE",
      url: `/user-reviews/${uid}`,
    });
    return data;
  } catch (e) {
    console.log("Error -", e);
  }
};

export const getReviews = async (id: string) => {
  try {
    const { data } = await instance({
      method: "GET",
      url: `/reviews/${id}`,
    });
    return data;
  } catch (e) {
    console.log("Error -", e);
  }
};

export const getUserReviews = async (id: string) => {
  try {
    const { data } = await instance({
      method: "GET",
      url: `/user-reviews/${id}`,
    });
    return data;
  } catch (e) {
    console.log("Error -", e);
  }
};

export const setReview = async (newReview: ReviewType) => {
  try {
    const { data } = await instance({
      method: "POST",
      url: "/create-review",
      data: newReview,
    });
    return data;
  } catch (e) {
    console.log("Error -", e);
  }
};
