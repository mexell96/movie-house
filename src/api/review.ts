import instance from "./instance";

export const deleteReview = async (uid: any) => {
  try {
    const { data } = await instance({
      method: "DELETE",
      url: `/api/profile-reviews/${uid}`,
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
      url: `/api/reviews/${id}`,
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
      url: `/api/profile-reviews/${id}`,
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
      url: "/api/create-review",
      data: newReview,
    });
    return data;
  } catch (e) {
    console.log("Error -", e);
  }
};
